import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateCustomerDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    //relacion 1:N embebida con orders
    @ApiProperty()
    readonly orders: string[]; //array de ids de orders
}

export class UpdateCustomerDto extends CreateCustomerDto{}