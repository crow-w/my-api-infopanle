import { Module } from '@nestjs/common';
import { DbClientService } from './dbclient.service';

@Module({
  controllers: [],
  providers: [DbClientService],
  imports: [],
  exports: [DbClientService],
})
export class DbClientModule {}
