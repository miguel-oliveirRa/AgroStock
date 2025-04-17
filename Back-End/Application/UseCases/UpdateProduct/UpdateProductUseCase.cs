using Application.DTOs;
using Application.Interfaces;

namespace Application.UseCases
{
    public class UpdateProductUseCase
    {
        private readonly IProductRepository _productRepository;

        public UpdateProductUseCase(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }   

        public async Task UpdateProduct(ProductDTO productDTO)
        {
            var product = await _productRepository.GetProductById(productDTO.Id);
            
            product.Name = productDTO.Name;
            product.Category = productDTO.Category;
            product.Amount = productDTO.Amount;

            await _productRepository.UpdateProduct(product);
        }       
    }
}