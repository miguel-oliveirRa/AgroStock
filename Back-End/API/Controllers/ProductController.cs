using Application.Interfaces;
using Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Application.Services.Users;

namespace API.Controllers
{
    [ApiController]
    [Route("api")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ITokenManager _tokenService;

        private readonly UserService _user;

        public ProductController(IProductService productService, ITokenManager tokenService, UserService user)
        {
            _tokenService = tokenService;
            _productService = productService;
            _user = user;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("product/createproduct")]
        public async Task<IActionResult> CreateProduct(CreateProductDTO productDTO)
        {
            if (productDTO == null)
                return BadRequest("Produto inválido.");

            await _productService.CreateProduct(productDTO);

            return Ok();
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("product/deleteproduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productDTO = await _productService.GetProductById(id);
            if (productDTO == null)
                return NotFound();

            await _productService.DeleteProduct(id);
            return Ok();
        }

        [HttpGet("product/getproducts")]
        [Authorize]
        public async Task<IActionResult> GetProduto()
        {
            var produtos = await _productService.GetProducts();
            return Ok(produtos);
        }

        [HttpGet("product/getbyid/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetByid(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("product/updateamount/{id}")]
        public async Task<IActionResult> UpdateAmount(ProductDTO productDTO)
        {
            if (productDTO == null)
                return BadRequest("Produto inválido.");

            var existingProduct = await _productService.GetProductById(productDTO.Id);
            if (existingProduct == null)
                return NotFound();

            existingProduct.Amount = productDTO.Amount;

            await _productService.UpdateAmountProduct(existingProduct);
            return Ok();
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("product/updateproduct")]
        public async Task<IActionResult> UpdateProduct(ProductDTO productDTO)
        {
            if (productDTO == null)
                return BadRequest("Produto inválido.");

            var existingProduct = await _productService.GetProductById(productDTO.Id);
            if (existingProduct == null)
                return NotFound();

            existingProduct.Name = productDTO.Name;
            existingProduct.Category = productDTO.Category;
            existingProduct.Amount = productDTO.Amount;

            await _productService.UpdateProduct(existingProduct);
            return Ok();
        }

        [HttpPost("product/login")]
        public IActionResult Login(LoginRequest request)
        {

            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Email e senha são obrigatórios." });
            }
        
            var user = _tokenService.Authenticate(request.Email, request.Password);

            if (user == null)
                return Unauthorized(new { message = "Usuário ou senha inválidos" });

            var token = _tokenService.GenerateToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken(user);
           
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(2)
            });

            return Ok(new { Token = token });
        }

        [HttpPost("auth/refresh")]
        public async Task<IActionResult> RefreshTokenRequest()
        {       
            var refreshToken = Request.Cookies["refreshToken"];

            if(string.IsNullOrEmpty(refreshToken))
                return BadRequest();

            var userEmail = await _tokenService.GenerateAccessTokenAsync(refreshToken);

            if (string.IsNullOrEmpty(userEmail))
                return BadRequest("Invalid token.");

            var user = _user.GetUserByEmail(userEmail);

            if(user == null)
                return NotFound();

            var newAccessToken = _tokenService.GenerateToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken(user);
            
            Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(2)
            });

            return Ok(new { Token = newAccessToken });
        }        
    }

    public class LoginRequest
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}