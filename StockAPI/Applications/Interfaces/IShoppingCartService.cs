using StockAPI.Applications.DTOs.Services;

namespace StockAPI.Applications.Interfaces
{
    public interface IShoppingCartService
    {
        Task SaveChangesAsync();
        Task CreateAsync(int productId, int amount);
        Task UpdateAsync(int shoppingCartId, int productId, int amount);
        Task RemoveAsync(int shoppingCartId);
        Task<List<ShoppingCartDto>> GetShoppingCartListAsync();
        Task<int?> GetIdByProductId(int productId);
    }
}
