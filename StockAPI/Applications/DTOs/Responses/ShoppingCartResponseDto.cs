namespace StockAPI.Applications.DTOs.Responses
{
    public class ShoppingCartResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public decimal Price { get; set; }
        public int ProductId { get; set; }
    }
}
