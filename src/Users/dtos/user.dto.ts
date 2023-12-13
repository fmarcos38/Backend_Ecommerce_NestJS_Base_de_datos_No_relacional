import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class CreateUserDto{

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}

export class FilterUsersDto {

    @IsOptional()
    @IsPositive()
    limit: number;        // Cantidad de registros por página

    @IsOptional()
    @Min(0)
    offset: number;      // Número de registros a ignorar

}