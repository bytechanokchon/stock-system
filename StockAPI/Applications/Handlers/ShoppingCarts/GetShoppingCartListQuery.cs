using MediatR;
using StockAPI.Applications.DTOs;
using StockAPI.Applications.DTOs.Responses;
using StockAPI.Applications.Interfaces;

namespace StockAPI.Applications.Handlers.ShoppingCarts
{
    public class GetShoppingCartListQuery : IRequest<BaseResponseDto<List<ShoppingCartResponseDto>>>
    {
        public class GetShoppingCartListQueryHandler : IRequestHandler<GetShoppingCartListQuery, BaseResponseDto<List<ShoppingCartResponseDto>>>
        {
            private readonly IShoppingCartService _shoppingCartService;

            public GetShoppingCartListQueryHandler(IShoppingCartService shoppingCartService)
            {
                this._shoppingCartService = shoppingCartService;
            }

            public async Task<BaseResponseDto<List<ShoppingCartResponseDto>>> Handle(GetShoppingCartListQuery request, CancellationToken cancellationToken)
            {
                var shoppingCarts = await this._shoppingCartService.GetShoppingCartListAsync();

                return new BaseResponseDto<List<ShoppingCartResponseDto>>()
                {
                    IsSuccess = true,
                    Message = "Successful",
                    Value = shoppingCarts.Select(x => new ShoppingCartResponseDto()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Amount = x.Amount,
                        Price = x.Price,
                        ProductId = x.ProductId
                    })
                    .ToList()
                };
            }
        }
    }
}
