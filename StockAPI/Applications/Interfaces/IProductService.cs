using StockAPI.Applications.DTOs.Services;

namespace StockAPI.Applications.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetProductListAsync();
        Task<bool> IsExistsAsync(int productId);
        Task<int> GetProductAmountAsync(int productId);
    }
}
