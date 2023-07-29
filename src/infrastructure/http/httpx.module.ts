import { Module } from '@nestjs/common';
import { HttpXService } from './httpx.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HttpXService],
  exports: [HttpXService],
})
export class HttpXModule {}
