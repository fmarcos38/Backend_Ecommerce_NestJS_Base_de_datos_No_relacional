import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateBrandDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

}

export class UpdateBrandyDto extends PartialType(CreateBrandDto) {}