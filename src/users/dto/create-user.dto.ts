import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, Min, IsEnum } from "class-validator";
import { UserGender } from "src/common/enums/gender";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;

    @IsNumber()
    @Min(18, {message: 'Debe ser mayor de edad'})
    @IsNotEmpty()
    age: number;

    @IsEnum(UserGender)
    @IsNotEmpty()
    @MinLength(4)
    gender: UserGender;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    photo: string;
    
}
