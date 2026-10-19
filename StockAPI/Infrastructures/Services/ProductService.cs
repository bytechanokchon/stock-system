using Microsoft.EntityFrameworkCore;
using StockAPI.Applications.DTOs.Services;
using StockAPI.Applications.Interfaces;
using StockAPI.Infrastructures.Persistence;

namespace StockAPI.Infrastructures.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<ProductDto>> GetProductListAsync()
        {
            return await this._context.Products
                .AsNoTracking()
                .Include(x => x.Stock)
                .Select(x => new ProductDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price,
                    Amount = x.Stock!.Amount
                })
                .ToListAsync();
        }

        public async Task<bool> IsExistsAsync(int productId)
        {
            return await this._context.Products.AnyAsync(x => x.Id == productId);
        }

        public async Task<int> GetProductAmountAsync(int productId)
        {
            return await this._context.Stocks.Where(x => x.ProductId == productId).Select(x => x.Amount).FirstAsync();
        }
    }
}
