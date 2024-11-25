import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Books } from "./books.entity";
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from "./books.repository";
import { JwtStrategy } from "../../core/guards/jwt.strategy";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Books]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, JwtStrategy],
})
export class BooksModule {}
