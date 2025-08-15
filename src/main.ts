import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir que nuestra página de React se comunique con este backend.
  app.enableCors(); 
  
  // Le dice a la aplicación que escuche peticiones en el puerto 3000.
  // Render se encargará de gestionar esto automáticamente.
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
