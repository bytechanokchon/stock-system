using MediatR;
using Microsoft.AspNetCore.Mvc;
using StockAPI.Applications.DTOs.Requests;
using StockAPI.Applications.Handlers.ShoppingCarts;
using StockAPI.Applications.Handlers.ShoppingCarts.Commands;

namespace StockAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ShoppingCartsController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> UpsertShoppingCart(UpsertShoppingCartRequestDto dto)
        {
            var result = await this._mediator.Send(new UpsertShoppingCartCommand(dto));
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetShoppingCartList()
        {
            var result = await this._mediator.Send(new GetShoppingCartListQuery());
            return Ok(result);
        }
    }
}
