import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ManagerError } from 'src/common/errors/manager.error';
import { ResponseAllUser } from './interfaces/response.interface';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { UserRole } from 'src/common/enums/user.roles';
import { UserGender } from 'src/common/enums/gender';

@Injectable()
export class UsersService {

  private user: User[] = [
    {id: 1, name: "oscar", age:20, photo: "image.png", email: "oscar@gmail.com", password: "12345", role: UserRole.User, gender: UserGender.Male, isActive: true }
  ]
  async create(createUserDto: CreateUserDto): Promise<User> {
    try{
      const user: User = {
        ...createUserDto,
        isActive: true,
        id: this.user.length + 1,
        role: UserRole.User,
      }

      this.user.push(user);

      return user;
    }catch(error){
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllUser>{
      const { limit, page } = paginationDto;
      const skip = (page - 1) * limit;
  
      try {
        if (this.user.length === 0) {
          throw new ManagerError({
            type: 'NOT_FOUND',
            message: 'users not found!',
          });
        }
  
        const total = this.user.filter((user) => user.isActive === true).length;
        const lastPage = Math.ceil(total / limit);
        const data = this.user.filter((user) => user.isActive === true).slice(skip, limit);
  
        return {
          page,
          limit,
          lastPage,
          total,
          data,
        };
    }catch(error){
      ManagerError.createSignatureError(error.message);
    }
  }
  
  async findOne(id: number) {
    try {

    const user= this.user.find((user => user.id === id && user.isActive === true))
      if (!user) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'no se encontro el usuario',
        })
      }

      return user;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = this.user.find((user) => user.id === id && user.isActive === true);
      if (!user) {
        throw new NotFoundException('user not found!');
      }

      const index = this.user.findIndex((user) => user.id === id && user.isActive === true);

      this.user[index] = {
        ...this.user[index],
        ...updateUserDto,
      };

      return this.user[index];
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      const indexUser= this.user.findIndex((user => user.id === id && user.isActive === true));
      if (indexUser=== -1) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'usernot found',
        });
      }

      this.user[indexUser] = {
        ...this.user[indexUser],
        isActive: false,
      }

      return this.user[indexUser]
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
