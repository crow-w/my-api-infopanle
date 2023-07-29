import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function GetApiResponse<T>(
  type: Type<T>,
  summary: string,
  isArray = false,
) {
  return applyDecorators(
    ApiOperation({ summary: summary }),
    ApiOkResponse({
      description: 'SUCCESS',
      type: type,
      isArray: isArray,
    }),
    ApiBadRequestResponse({ description: 'BAD_REQUEST' }),
    ApiUnauthorizedResponse({ description: 'UNAUTHORIZED' }),
    ApiInternalServerErrorResponse({
      description: 'INTERNAL_SERVER_ERROR',
    }),
  );
}
