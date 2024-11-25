import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { BooksRepository } from './books.repository';
import { Books } from "./books.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { UsersRepository } from "../users/users.repository";
import { UpdateBookDto } from "./dto/update-book.dto";


@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private usersRepository: UsersRepository
  ) {}

  // Получить список всех книг
  async getAllBooks(): Promise<Books[]> {
    return this.booksRepository.findAll();
  }

  // Получить книгу по ID
  async getBookById(id: number, userId?: number): Promise<Books> {
    const book = await this.booksRepository.findOneOrNotFoundFail(id);

    if(book.ageRestriction >= 18) {
      if(!userId) {
        throw new ForbiddenException();
      }

      const user = await this.usersRepository.findByIdOrNotFoundFail(userId);

      if(user.age >= 18) {
        return book
      } else {
        throw new ForbiddenException();
      }
    } else {
      return book;
    }
  }

  // Создать новую книгу
  async createBook(dto: CreateBookDto, userId: number): Promise<void> {
    const user = await this.usersRepository.findByIdOrNotFoundFail(userId);

    const book = Books.createBook(dto, userId, user.age);

    await this.booksRepository.save(book);
  }

  async updateBook(dto: UpdateBookDto, userId: number, bookId: number): Promise<void> {
    const book = await this.booksRepository.findOneOrNotFoundFail(bookId);

    book.updateBook(dto, userId)

    await this.booksRepository.save(book);
  }

  async deleteBook(bookId: number, userId: number): Promise<void> {
    const book = await this.booksRepository.findOneOrNotFoundFail(bookId);

    if(book.ownerId !== userId) {
      throw new ForbiddenException();
    }

    await this.booksRepository.remove(bookId);
  }
}