import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsArray, IsDate, IsMongoId, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    
    @IsDate()
    @IsNotEmpty()
    readonly date: Date;

    @IsNotEmpty()
    @IsMongoId()
    readonly customer: string;

    @IsArray()
    @IsNotEmpty()
    readonly products: string[];
}
export class UpdateOrderDto extends PartialType(
    OmitType(CreateOrderDto, ['products']), //con esto se omite el campo products
) {}

//creo un dto para el agregado de prod a la orden
export class AddProductToOrderDto {
    @IsArray()
    @IsNotEmpty()
    readonly productsIds: string[];
}