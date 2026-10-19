namespace StockAPI.Applications.DTOs.Requests
{
    public class ShoppingCartRequestDto
    {
        public int? ShoppingCartId { get; set; }
        public int ProductId { get; set; }
        public int Amount { get; set; }
    }
}
