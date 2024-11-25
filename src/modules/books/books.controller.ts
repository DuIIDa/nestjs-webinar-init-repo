import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  Param,
  Post,
  Put, UseGuards,
  Request
} from "@nestjs/common";
import { BooksService } from './books.service';
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { JwtAuthGuard } from "../../core/guards/jwt-auth-guard";
import { OptionalJwtGuard } from "../../core/guards/jwt-optional-guard";

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Получить список всех книг
  @Get()
  async getAllBooks() {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    const result = await this.booksService.getAllBooks();
    return result
  }

  // Получить книгу по ID
  @Get(':id')
  @UseGuards(OptionalJwtGuard)
  async getBookById(@Param('id') id: number, @Request() req: any) {
    const result = await this.booksService.getBookById(id, req?.user?.userId);
    return result
  }

  // Создать новую книгу
  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createBook(@Body() bookDto: CreateBookDto, @Request() req: any) {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    return this.booksService.createBook(bookDto, req.user.userId);
  }

  // Обновить информацию о книге
  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto, @Request() req: any) {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    return this.booksService.updateBook(bookDto, req.user.userId, id);
  }

  // Удалить книгу
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async deleteBook(@Param('id') id: number, @Request() req: any) {
    // необходимо вызвать соответствующий метод сервиса и вернуть результат
    const result = await this.booksService.deleteBook(id, req.user.userId);
  }
}