import { AbsUserRepository } from "../../domain/repositories/user.repository";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { RequestHandler } from "express";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserModel } from "../../config/data/mongo/models/user.model";
import { checkPassword } from "../../shared/helpers/checkPassword.helper";
import { UserUseCases } from "../../domain/use-cases/user.use-cases";

export class UserController {
    constructor(private readonly userRepository: AbsUserRepository){}

    public getUser: RequestHandler = (req, res) => {
        //? Get necessary data from query params
        const {id_user} = req.params;
        
        //? We use the specific use-case
        new UserUseCases(this.userRepository)
        .getUserById(id_user)
        .then((user) => res.json(user))
        .catch((error) => res.status(500).json({error: error.message}));
    }
    
    public getUsers:RequestHandler = (req, res) => {
        //? We use the specific use-case
        new UserUseCases(this.userRepository)
        .getAllUsers()
        .then((users) => res.json(users))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public createUser:RequestHandler = (req, res) => {
        const [error, user] = CreateUserDto.create(req.body);
        
        if(error){
            res.status(400).json({error});
            return;
        }

        new UserUseCases(this.userRepository)
        .createUser(user!)
        .then((user) => res.json(user))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public updateUser: RequestHandler = (req, res) => {
        const { user_id } =  req.params;
        const obj = {...req.body, user_id};
        const [error, user] = UpdateUserDto.create(obj);

        if(error){
            res.status(400).json({error});
            return;
        }

        new UserUseCases(this.userRepository)
        .updateUser(user!)
        .then((user) => res.json(user))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public deleteUser: RequestHandler = (req, res) => {
        const {user_id} = req.params;

        new UserUseCases(this.userRepository)
        .deleteUser(user_id)
        .then((user) => res.json(user))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public checkPassword: RequestHandler = async (req, res) => {
        try{
            const { user_id } = req.params;
            const { password } = req.body;
            const user = await UserModel.findOne({user_id});

            if(!user){
                res.status(404).json({error: 'User not found'});
                return;
            }
            
            const userEntity = UserEntity.fromObject(user);
            const checkResult= await checkPassword(userEntity.password, password);
            res.status(200).json({checkResult});
        }catch(error){ 
            res.status(500).json({error: error.message});
        }
    }
}