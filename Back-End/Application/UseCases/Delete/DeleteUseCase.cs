using Application.Interfaces;

namespace Application.UseCases
{
    public class DeleteUseCase
    {
        private readonly IProductRepository _productRepository;

        public DeleteUseCase(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<bool> Delete(int id)
        {
            return await _productRepository.DeleteProduct(id);
        }

    }
}