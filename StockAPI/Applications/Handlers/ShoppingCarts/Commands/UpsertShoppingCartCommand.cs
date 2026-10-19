using MediatR;
using StockAPI.Applications.DTOs;
using StockAPI.Applications.DTOs.Requests;
using StockAPI.Applications.Interfaces;

namespace StockAPI.Applications.Handlers.ShoppingCarts.Commands
{
    public class UpsertShoppingCartCommand : IRequest<BaseResponseDto<object>>
    {
        public UpsertShoppingCartCommand(UpsertShoppingCartRequestDto dto)
        {
            Dto = dto;
        }

        public UpsertShoppingCartRequestDto Dto { get; }

        public class UpsertShoppingCartCommandHandler : IRequestHandler<UpsertShoppingCartCommand, BaseResponseDto<object>>
        {
            private readonly IShoppingCartService _shoppingCartService;
            private readonly IProductService _productService;

            public UpsertShoppingCartCommandHandler(IShoppingCartService shoppingCartService, IProductService productServuce)
            {
                this._shoppingCartService = shoppingCartService;
                this._productService = productServuce;
            }

            public async Task<BaseResponseDto<object>> Handle(UpsertShoppingCartCommand request, CancellationToken cancellationToken)
            {
                var shoppingCarts = request.Dto.ShoppingCarts;

                if (shoppingCarts != null)
                {
                    foreach (var shoppingCart in shoppingCarts)
                    {
                        var isProductExists = await this._productService.IsExistsAsync(shoppingCart.ProductId);
                        if (!isProductExists) return new BaseResponseDto<object>()
                        {
                            IsSuccess = false,
                            Message = $"Product id {shoppingCart.ProductId} not found."
                        };

                        if (isProductExists && shoppingCart.ShoppingCartId == null)
                        {
                            shoppingCart.ShoppingCartId = await this._shoppingCartService.GetIdByProductId(shoppingCart.ProductId);
                            if (shoppingCart.ShoppingCartId <= 0) shoppingCart.ShoppingCartId = null;
                        }

                        var productAmount = await this._productService.GetProductAmountAsync(shoppingCart.ProductId);
                        if (shoppingCart.Amount >  productAmount) return new BaseResponseDto<object>()
                        {
                            IsSuccess = false,
                            Message = $"Insufficient stock remaining."
                        };

                        if (shoppingCart.ShoppingCartId == null) // create
                        {
                            await this._shoppingCartService.CreateAsync(shoppingCart.ProductId, shoppingCart.Amount);
                        }
                        else if (shoppingCart.ShoppingCartId != null) // update or remove
                        {
                            if (shoppingCart.Amount > 0) // update
                            {
                                await this._shoppingCartService.UpdateAsync(Convert.ToInt32(shoppingCart.ShoppingCartId), shoppingCart.ProductId, shoppingCart.Amount);
                            }
                            else // remove
                            {
                                await this._shoppingCartService.RemoveAsync(Convert.ToInt32(shoppingCart.ShoppingCartId));
                            }
                        }
                    }
                }

                await this._shoppingCartService.SaveChangesAsync();

                return new BaseResponseDto<object>()
                {
                    IsSuccess = true,
                    Message = "Successful",
                    Value = null
                };
            }
        }
    }
}
