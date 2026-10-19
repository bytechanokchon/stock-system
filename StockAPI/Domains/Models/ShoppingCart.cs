namespace StockAPI.Domains.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Amount { get; set; }
        public Product Product { get; set; }
    }
}
