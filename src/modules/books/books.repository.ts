import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from "./books.entity";

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Books)
    private readonly booksORMRepository: Repository<Books>,
  ) {}

  async save(book: Books): Promise<Books> {
    return this.booksORMRepository.save(book);
  }

  async findAll(): Promise<Books[]> {
    return this.booksORMRepository.find();
  }

  async findOneOrNotFoundFail(id: number): Promise<Books> {
    const result = await this.booksORMRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('book not found'); //тут код прервется и выдаст ошибку, которую nestjs отправит в ответе
    }

    return result;
  }

  async remove(id: number): Promise<void> {
    await this.booksORMRepository.delete(id);
  }
}