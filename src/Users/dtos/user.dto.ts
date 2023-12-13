import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


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