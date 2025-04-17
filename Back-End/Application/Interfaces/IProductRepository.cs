using Domain.Entities;

namespace Application.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetProductById(int id);
        Task Create(Product product);
        Task UpdateProduct(Product product);
        Task<bool> UpdateAmount(Product product);
        Task<bool> DeleteProduct(int id);
    }
}