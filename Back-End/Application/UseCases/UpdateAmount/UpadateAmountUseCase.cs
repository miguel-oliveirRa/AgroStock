using Application.Interfaces;
using Application.DTOs;

namespace Application.UseCases
{
    public class UpdateAmountUseCase
    {
        private readonly IProductRepository _productRepository;

        public UpdateAmountUseCase(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }   

        public async Task UpdateAmount(ProductDTO productDTO)
        {
            var product = await _productRepository.GetProductById(productDTO.Id);
            
            product.Amount = productDTO.Amount;

            await _productRepository.UpdateProduct(product);
        }       
    }
}