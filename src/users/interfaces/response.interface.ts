import { User } from "../entities/user.entity";

export interface ResponseAllUser{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: User[];
}