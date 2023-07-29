import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function PatchApiResponse(summary: string) {
  return applyDecorators(
    ApiOperation({ summary: summary }),
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
