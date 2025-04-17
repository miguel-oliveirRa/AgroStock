namespace Application.DTOs
{
    
    public class CreateProductDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public  int Amount { get; set; } = 0;
    }

    public class ProductDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public required string Category { get; set; }

        public required int Amount { get; set; }
    }
}