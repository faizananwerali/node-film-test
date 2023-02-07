import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsEntity, FilmEntity } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: 'user_queue',
          noAck: true,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([FilmEntity, ActorsEntity]),
  ],
  controllers: [FilmController],
  providers: [FilmService, JwtStrategy],
})
export class FilmModule {}
