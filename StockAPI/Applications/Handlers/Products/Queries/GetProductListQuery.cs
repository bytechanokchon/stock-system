using MediatR;
using StockAPI.Applications.DTOs;
using StockAPI.Applications.DTOs.Responses;
using StockAPI.Applications.Interfaces;

namespace StockAPI.Applications.Handlers.Products.Queries
{
    public class GetProductListQuery : IRequest<BaseResponseDto<List<ProductResponseDto>>>
    {
        public class GetProductListQueryHandler : IRequestHandler<GetProductListQuery, BaseResponseDto<List<ProductResponseDto>>>
        {
            private readonly IProductService productService;

            public GetProductListQueryHandler(IProductService productService)
            {
                this.productService = productService;
            }

            public async Task<BaseResponseDto<List<ProductResponseDto>>> Handle(GetProductListQuery request, CancellationToken cancellationToken)
            {
                var products = await this.productService.GetProductListAsync();

                var productResponses = products.Select(x => new ProductResponseDto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Amount = x.Amount,
                    Price = x.Price
                })
                .ToList();

                return new BaseResponseDto<List<ProductResponseDto>>()
                {
                    IsSuccess = true,
                    Message = "Successful",
                    Value = productResponses
                };
            }
        }
    }
}
