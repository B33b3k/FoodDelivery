import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
//nest express application
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'servers/apps/email-templates'));
  app.setViewEngine('ejs');

  app.enableCors();

  


  await app.listen(3000);
}
bootstrap();
