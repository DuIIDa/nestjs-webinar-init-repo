import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../core/entity/base.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { ForbiddenException } from "@nestjs/common";
import { UpdateBookDto } from "./dto/update-book.dto";

@Entity('books')
export class Books extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ageRestriction: number; //возрастные ограничения на книгу

  @Column({ nullable: true })
  ownerId: number; //id пользователя, который добавил книгу

  @Column({ nullable: true })
  image?: string;

  static createBook(dto: CreateBookDto, userId: number, userAge: number): Books {
    if(userAge < 18 && dto.ageRestriction >= 18) {
      throw new ForbiddenException('age is invalid');
    }

    const book = new Books();
    book.title = dto.title;
    book.ageRestriction = dto.ageRestriction;
    book.author = dto.author;
    book.ownerId = userId;

   return book;
  }

  updateBook(dto: UpdateBookDto, userId: number) {
    if(this.ownerId !== userId) {
      throw new ForbiddenException();
    }

    this.title = dto.title ?? this.title;
    this.ageRestriction = dto.ageRestriction ?? this.ageRestriction;
    this.author = dto.author ?? this.author;
  }
}