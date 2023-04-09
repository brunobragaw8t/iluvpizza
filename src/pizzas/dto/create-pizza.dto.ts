import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePizzaDto {
  @ApiProperty({ description: 'The name of the pizza.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of the pizza.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
