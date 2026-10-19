namespace StockAPI.Applications.DTOs
{
    public class BaseResponseDto<T>
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = null!;
        public T? Value { get; set; }
    }
}
