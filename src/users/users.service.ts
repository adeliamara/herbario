import { ForbiddenException, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Pagination, IPaginationOptions,paginate } from 'nestjs-typeorm-paginate';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    userData.removed = false;

    // if(!this.isPasswordSecure(password)){
    //   throw new BadRequestException('A senha fornecida não atende aos critérios de segurança.');
    // }
   // const hashedSenha: string = bcrypt.hashSync(password, 10);
    const user: User = this.userRepository.create({ ...userData, password: password });
    return this.userRepository.save(user);
  }

  // findAll(user: User) {
  //   if(user){
  //     return this.userRepository.find()   
  //   }
  //   throw new UnauthorizedException();
  // }

  // async findOne(id: number, user: User) {
    async findOne(email: string) {

    // console.log(user)
    // if(user || user.id == id){
    //   return await this.userRepository.findOneBy({id: id}) ; 
    // }

   // throw new UnauthorizedException();

   return await this.userRepository.findOneBy({email: email}) ; 

  }

  async findOneById(id: string) {

    // console.log(user)
    // if(user || user.id == id){
    //   return await this.userRepository.findOneBy({id: id}) ; 
    // }

   // throw new UnauthorizedException();

   return await this.userRepository.findOneBy({id: Number(id)}) ; 

  }
}