import { Module } from '@nestjs/common';
import { ValidationPipe } from '@/common/pipes/validation.pipe';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { UnprocessableEntityExceptionFilter } from '@common/exception-filters';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { TransformInterceptor } from '@/common/interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/common/configs';
import { User } from '@/common/entities';

@Module({
  imports: [
    UserModule,
    AuthModule,
    FilmModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: [User],
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: UnprocessableEntityExceptionFilter },
  ],
})
export class AppModule {}
