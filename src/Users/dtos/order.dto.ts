import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly customer: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    readonly date: Date;

    @ApiProperty()
    @IsNotEmpty()
    readonly products: string[];
}