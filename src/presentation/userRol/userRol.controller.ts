import { RequestHandler } from "express";
import { AbsUserRolRepository } from "../../domain/repositories/userRol.repository";
import { UserRolUseCases } from "../../domain/use-cases/userRol.use-cases";
import { CreateUserRolDto } from "../../domain/dtos/userRol/create-userRol.dto";

export class UserRolController{
    constructor(private readonly userRolRepository: AbsUserRolRepository){}

    public getUserRol: RequestHandler = (req, res) => {
            //? Get necessary data from query params
            const {id_user_rol} = req.params;
            
            //? We use the specific use-case
            new UserRolUseCases(this.userRolRepository)
            .getUserRolById(Number(id_user_rol))
            .then((user) => res.json(user))
            .catch((error) => res.status(500).json({error: error.message}));
    }

    public getUserRols:RequestHandler = (req, res) => {
            //? We use the specific use-case
            new UserRolUseCases(this.userRolRepository)
            .getAllUserRols()
            .then((users) => res.json(users))
            .catch((error) => res.status(500).json({error: error.message}));
    }

    public createUserRol:RequestHandler = (req, res) => {
            const [error, userRol] = CreateUserRolDto.create(req.body);
            
            if(error){
                res.status(400).json({error});
                return;
            }
    
            new UserRolUseCases(this.userRolRepository)
            .createUserRol(userRol!)
            .then((userRol) => res.json(userRol))
            .catch((error) => res.status(404).json({error: error.message}));
    }

    public deleteUserRol: RequestHandler = (req, res) => {
            const {id_user_rol} = req.params;
    
            new UserRolUseCases(this.userRolRepository)
            .deleteUserRol(Number(id_user_rol))//le crea como número
            .then((userRol) => res.json(userRol))
            .catch((error) => res.status(404).json({error: error.message}));
        }
}