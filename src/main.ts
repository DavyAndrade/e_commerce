import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Projeto Integrador: We Do Care')
  .setDescription('ODS 9')
  .setContact('Contato Generation', 'Generation Brasil', 'https://brazil.generation.org/%27')
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  await app.listen(3000 || process.env.PORT);
  
}
bootstrap();