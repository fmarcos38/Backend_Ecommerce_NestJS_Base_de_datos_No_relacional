import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


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
}

export class UpdateCustomerDto extends CreateCustomerDto{}