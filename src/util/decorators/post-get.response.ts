import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function PostGetApiResponse() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'BAD REQUEST',
    }),
    ApiUnauthorizedResponse({
      description: 'UNAUTHORIZED',
    }),
    ApiInternalServerErrorResponse({
      description: 'INTERNAL SERVER ERROR',
    }),
  );
}
