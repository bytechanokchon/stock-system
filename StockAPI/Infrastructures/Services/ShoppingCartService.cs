using Microsoft.EntityFrameworkCore;
using StockAPI.Applications.DTOs.Services;
using StockAPI.Applications.Interfaces;
using StockAPI.Domains.Models;
using StockAPI.Infrastructures.Persistence;

namespace StockAPI.Infrastructures.Services
{
    public class ShoppingCartService : IShoppingCartService
    {
        private readonly AppDbContext _context;

        public ShoppingCartService(AppDbContext context)
        {
            this._context = context;
        }

        public async Task SaveChangesAsync()
        {
            await this._context.SaveChangesAsync();
        }

        public async Task CreateAsync(int productId, int amount)
        {
            var shoppingCart = new ShoppingCart()
            {
                ProductId = productId,
                Amount = amount
            };
            await this._context.ShoppingCarts.AddAsync(shoppingCart);

            var stock = await this._context.Stocks.AsNoTracking().Where(x => x.ProductId == productId).FirstAsync();
            stock.Amount -= amount;
            this._context.Stocks.Update(stock);
        }

        public async Task UpdateAsync(int shoppingCartId, int productId, int amount)
        {
            var shoppingCart = await this._context.ShoppingCarts.FirstOrDefaultAsync(x => x.Id == shoppingCartId);
            if (shoppingCart != null)
            {
                int oldAmount = shoppingCart.Amount;

                shoppingCart.Amount = amount;
                this._context.ShoppingCarts.Update(shoppingCart);

                var stock = await this._context.Stocks.AsNoTracking().Where(x => x.ProductId == productId).FirstAsync();
                stock.Amount += oldAmount;
                stock.Amount -= amount;
                this._context.Stocks.Update(stock);
            }
        }

        public async Task RemoveAsync(int shoppingCartId)
        {
            var shoppingCart = await this._context.ShoppingCarts.FirstOrDefaultAsync(x => x.Id == shoppingCartId);

            if (shoppingCart != null)
            {
                this._context.ShoppingCarts.Remove(shoppingCart);

                var stock = await this._context.Stocks.AsNoTracking().Where(x => x.ProductId == shoppingCart.ProductId).FirstAsync();
                stock.Amount += shoppingCart.Amount;
                this._context.Stocks.Update(stock);
            }
        }

        public async Task<List<ShoppingCartDto>> GetShoppingCartListAsync()
        {
            return await this._context.ShoppingCarts
                .Include(x => x.Product)
                .Select(x => new ShoppingCartDto()
                {
                    Id = x.Id,
                    Name = x.Product.Name,
                    Amount = x.Amount,
                    Price = x.Product.Price,
                    ProductId = x.Product.Id
                })
                .ToListAsync();
        }

        public async Task<int?> GetIdByProductId(int productId)
        {
            return await this._context.ShoppingCarts.Where(x => x.ProductId == productId).Select(x => x.Id).FirstOrDefaultAsync();
        }
    }
}
