import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUrl, IsOptional, Min, ValidateIf } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: `product's name` }) // 👈 use ApiProperty
    readonly name: string; 

    @IsString()
    @IsNotEmpty()
    @ApiProperty() 
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty() 
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty() 
    readonly stock: number;

    @IsUrl()
    //@IsNotEmpty()
    @ApiProperty() 
    readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {

    @IsOptional()
    @IsPositive()
    limit: number;        // Cantidad de registros por página

    @IsOptional()
    @Min(0)
    offset: number;      // Número de registros a ignorar

    @IsOptional()
    @Min(0)    
    minPrice: number;    // Precio mínimo

    //@ValidateIf((parametro) => parametro.minPrice)    // Si minPrice existe, entonces maxPrice tiene q venir
    @IsOptional()
    @IsPositive()
    maxPrice: number;    // Precio máximo
}