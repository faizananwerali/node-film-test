import { Module } from '@nestjs/common';
import { ValidationPipe } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { UnprocessableEntityExceptionFilter } from '@app/common';
import { FilmModule } from './film/film.module';
import { TransformInterceptor } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@app/common';
import { UserEntity, ActorsEntity, FilmEntity } from '@app/common';

@Module({
  imports: [
    FilmModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: [UserEntity, ActorsEntity, FilmEntity],
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: UnprocessableEntityExceptionFilter },
  ],
})
export class AppModule {}
