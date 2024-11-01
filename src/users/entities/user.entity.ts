import { UserGender } from "src/common/enums/gender";
import { UserRole } from "src/common/enums/user.roles";

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    gender: UserGender;
    photo: string;
    role: UserRole;
    isActive: boolean = true;
}
