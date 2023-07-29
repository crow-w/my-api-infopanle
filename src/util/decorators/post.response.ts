import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function PostApiResponse<T = any>(type: Type<T>) {
  return applyDecorators(
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
