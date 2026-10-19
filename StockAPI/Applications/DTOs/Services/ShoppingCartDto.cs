namespace StockAPI.Applications.DTOs.Services
{
    public class ShoppingCartDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public decimal Price { get; set; }
        public int ProductId { get; set; }
    }
}
