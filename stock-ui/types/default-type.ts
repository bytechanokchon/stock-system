export interface BaseResponseDto<T> {
    isSuccess: boolean;
    message: string;
    value: T
}