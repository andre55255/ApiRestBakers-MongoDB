import { ApiResponseVO } from "../viewObjects/utils/ApiResponseVO";
import { ResultVO } from "../viewObjects/utils/ResultVO";

export function buildApiResponse(
    success: Boolean,
    statusCode: number,
    message?: String | any,
    object?: Object | null
): ApiResponseVO {
    const apiResponse: ApiResponseVO = {
        success,
        statusCode,
        message,
        object,
    };

    return apiResponse;
}

export function buildResult(
    success: Boolean,
    message: String,
    object?: Object | null
): ResultVO {
    const resultDto: ResultVO = {
        success,
        message,
        object,
    };

    return resultDto;
}
