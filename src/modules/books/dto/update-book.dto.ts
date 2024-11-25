import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}

//чтобы избежать дублирования dto можно использовать встроенную утилиту PartialType, которая делает ве поля опциональными
//export class UpdateBookDto extends PartialType(CreateBookDto) {}