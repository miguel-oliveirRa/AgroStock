using Application.DTOs;

namespace Application.Interfaces
{
    public interface IProductService
    {
        Task<ProductDTO> GetProductById(int id);
        Task<IEnumerable<ProductDTO>> GetProducts();
        Task CreateProduct(CreateProductDTO product);  
        Task UpdateAmountProduct(ProductDTO product);
        Task UpdateProduct(ProductDTO product);
        Task<bool> DeleteProduct(int id);

    }
}