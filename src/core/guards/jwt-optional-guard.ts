
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    return user;
  }
}
