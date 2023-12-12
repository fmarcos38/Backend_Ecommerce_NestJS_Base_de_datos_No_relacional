import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUrl } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: `product's name` }) // 👈 use ApiProperty
    readonly name: string; 

    @IsString()
    @IsNotEmpty()
    @ApiProperty() // 👈 use ApiProperty
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty() // 👈 use ApiProperty
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty() // 👈 use ApiProperty
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty() // 👈 use ApiProperty
    readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}