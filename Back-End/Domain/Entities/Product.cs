namespace Domain.Entities
{
    public sealed class Product
    {
         public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        private int _amount;
        // public decimal Price { get; set; }
        public int Amount { 
            get => _amount;
            set {
                if(value < 0) throw new Exception("Amount cannot be negative");
                _amount = value;
            }    
        }

        public Product(string Name, string Category, int Amount)
        {
            this.Name = Name;
            this.Category = Category;
            this.Amount = Amount;
        }
    }
}