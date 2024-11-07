import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionsFilter } from './infrastructure/middleware/filter';
import { LoggingInterceptor } from './infrastructure/middleware/interceptor';
import { validationPipe } from './infrastructure/middleware/pipe';
import { MainModule } from './main.module';
import fastifyMultipart from 'fastify-multipart';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new HttpExceptionsFilter(app.get(HttpAdapterHost)));

  app.enableCors({
    origin: '*',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  });
  app.setGlobalPrefix('v1');

  app.register(fastifyMultipart);
  // // 配置静态文件服务
  // app.register(fastifyStatic, {
  //   root: join(__dirname, '..', 'uploads'),
  //   prefix: '/uploads/', // 访问静态文件的 URL 前缀
  // });
  const port = Number(process.env.LISTEN_PORT) || 3000;
  const apiHost = process.env.Host || `localhost:${port}`;
  const config = new DocumentBuilder()
    .setTitle('test-api')
    .setDescription('test api description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://${apiHost}`)
    .addServer(`https://${apiHost}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v1/docs', app, document);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
