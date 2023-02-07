import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { RmqContext, ClientRMQ } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('USER_SERVICE') private client: ClientRMQ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: number }) {
    try {
      const user = await firstValueFrom(
        this.client.send('get_user', payload.id).pipe(timeout(5000))
      );
      return user || false;
    } catch (error) {
      throw error;
    }
  }
}
