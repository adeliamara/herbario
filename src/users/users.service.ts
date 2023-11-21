import { ForbiddenException, Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Pagination, IPaginationOptions,paginate } from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async findOne(id: number, user: User) {
    return await this.userRepository.findOneBy({id: id});
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
}