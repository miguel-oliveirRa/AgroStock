using Domain.Entities;
using Application.Interfaces;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repository
{
    public class ProductRepository : IProductRepository
    {

        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context){
            _context = context;
        }

        public async Task Create(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new ArgumentNullException("Not Found this product!");    
            }

            _context.Products.Remove(product);
            
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Product> GetProductById(int id)
        {
Console.WriteLine($"Buscando produto com ID: {id}");

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new ArgumentNullException("Not found this product!");
            }   

            return product;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            if (products == null)
            {
                throw new ArgumentNullException("Dont't exists products!");
            }   

            return products; 
        }

        public async Task<bool> UpdateAmount(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }

            var existingProduct = await _context.Products.FindAsync(product.Id);
            if (existingProduct == null)
            {
                throw new ArgumentNullException("Not found this product!");
            }

            existingProduct.Amount = product.Amount;

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task UpdateProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }

            var existingProduct = await _context.Products.FindAsync(product.Id);
            if (existingProduct == null)
            {
                throw new ArgumentNullException("Not found this product!");
            }

            existingProduct.Name = product.Name;
            existingProduct.Category = product.Category;
            existingProduct.Amount = product.Amount;

            _context.Products.Update(existingProduct);        
            await _context.SaveChangesAsync();  
        }
    }
}