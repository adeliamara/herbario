import { ForbiddenException, Injectable, BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Pagination, IPaginationOptions,paginate } from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../role/role.service';
import { Role } from '../setup/enums/role.enum';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly roleService: RoleService

  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    userData.removed = false;

    if(!this.isPasswordSecure(password)){
      throw new BadRequestException('A senha fornecida não atende aos critérios de segurança.');
    }
    const hashedSenha: string = bcrypt.hashSync(password, 10);
    const user: User = this.userRepository.create({ ...userData, password: hashedSenha });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
      return this.userRepository.find()   
  }

  async findOneByEmail(email: string) {
   return await this.userRepository.findOneBy({email: email}) ; 
  }

  async findOne(userReq: User, id: number) {

    if (userReq.id != id) {
      const isAdmin = this.roleService.userHasRolePermission(userReq, Role.ADMIN);

      if (!isAdmin){
        throw new ForbiddenException();
      }

    }
    const result: User = await this.userRepository.findOneBy({id: id});

    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return result;
  }

  private isPasswordSecure(password: string): boolean {
    const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;
    const regexNumber = /[0-9]/;
  
    const hasMinLength = password.length >= 8;
    const hasSpecialChar = regexSpecialChar.test(password);
    const hasLowercase = regexLowercase.test(password);
    const hasUppercase = regexUppercase.test(password);
    const hasNumber = regexNumber.test(password);
  
    return (
      hasMinLength &&
      hasSpecialChar &&
      hasLowercase &&
      hasUppercase &&
      hasNumber
    );
  }

  async remove(userReq: User, id: number) {
    const user: User = await this.findOne(userReq, id)
    return this.userRepository.softRemove(user);
  }

  async count(){
    return await this.userRepository.count();
  }

  async getSoftDeleted() {
    const softDeletedExsiccata = await this.userRepository.find({
      where: {
        deletedAt: Not(IsNull()), 
      },
      withDeleted: true,
    });

    return softDeletedExsiccata;
  }
}