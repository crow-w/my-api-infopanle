import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function DeleteApiResponse<T = any>(type: Type<T>, summary: string) {
  return applyDecorators(
    ApiOperation({ summary: summary }),
    ApiOkResponse({
      description: 'SUCCESS',
      type: type,
    }),
    ApiCreatedResponse({
      description: 'CREATED',
    }),
    ApiNoContentResponse({
      description: 'NO CONTENT',
    }),
    ApiBadRequestResponse({
      description: 'BAD REQUEST',
    }),
    ApiUnauthorizedResponse({
      description: 'UNAUTHORIZED',
    }),
    ApiConflictResponse({ description: 'CONFLICT' }),
    ApiInternalServerErrorResponse({
      description: 'INTERNAL SERVER ERROR',
    }),
  );
}
