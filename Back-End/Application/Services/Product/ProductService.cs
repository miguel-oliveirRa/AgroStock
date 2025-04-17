using Application.DTOs;
using Application.Interfaces;
using Application.UseCases;

namespace Application.Services.Product
{
    public class ProductService : IProductService
    {

        private readonly CreateUseCase _createUseCase;
        private readonly DeleteUseCase _deleteUseCase;
        private readonly UpdateAmountUseCase _updateAmountUseCase;
        private readonly UpdateProductUseCase _updateProductUseCase;
        private readonly GetUseCase _getUseCase;
        private readonly GetByIdUseCase _getByIdUseCase;

        public ProductService(CreateUseCase createUseCase, DeleteUseCase deleteUseCase, UpdateAmountUseCase updateAmountUseCase, UpdateProductUseCase updateProductUseCase, GetUseCase getUseCase, GetByIdUseCase getByIdUseCase)
        {
            _createUseCase = createUseCase;
            _deleteUseCase = deleteUseCase;
            _updateAmountUseCase = updateAmountUseCase;
            _getUseCase = getUseCase;
            _getByIdUseCase = getByIdUseCase;
            _updateProductUseCase = updateProductUseCase;
        }

        public async Task CreateProduct(CreateProductDTO product)
        {
            await _createUseCase.Create(product);
        }

        public async Task<bool> DeleteProduct(int id)
        {
            await _deleteUseCase.Delete(id);
            return true;
        }

        public async Task<ProductDTO> GetProductById(int id)
        {
            var product = await _getByIdUseCase.GetById(id);
            return product;
        }

        public async Task<IEnumerable<ProductDTO>> GetProducts()
        {
            var products = await _getUseCase.Get();
            return products;
        }

        public async Task UpdateAmountProduct(ProductDTO product)
        {
            await _updateAmountUseCase.UpdateAmount(product);  
        }

        public async Task UpdateProduct(ProductDTO product)
        {
            await _updateProductUseCase.UpdateProduct(product);
        }
    }
}