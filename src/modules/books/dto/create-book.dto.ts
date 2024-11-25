import { IsInt, IsOptional, IsString, Max, Min, MinLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsInt()
  @Min(5)
  @Max(120)
  @Type(() => Number)
  // @Transform((params) => {
  //   return Number(params.value)
  // })
  ageRestriction: number;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  image?: string;
}
