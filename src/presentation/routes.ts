import {Router} from "express";
import { UserRoutes } from "./user/user.routes";
import { AreaRoutes } from "./area/area.routes";
import { BranchRoutes } from "./branch/branch.routes";
import { ItemRoutes } from "./item/item.routes";
import { ResourceRoutes } from "./resource/resource.routes";
import { EntityRoutes } from "./entity/entity.routes";
import { ItemTypeRoutes } from "./itemType/itemType.routes";
import { UserRolRoutes } from "./userRol/userRol.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        //? Test Endpoint 
        router.use('/api', (req, res) => {
            console.log('REQUEST');
            res.json({message: "REQUEST"});
        });

        //? Area route endpoint
        router.use('/area', AreaRoutes.routes);

        //? Branch route endpoint
        router.use('/branch', BranchRoutes.routes);

        //? Entity route endpoint
        router.use('/entity', EntityRoutes.routes);

        //? Item route endpoint
        router.use('/item', ItemRoutes.routes);
        
        //? Item route endpoint
        router.use('/itemType', ItemTypeRoutes.routes);

        //? Resource route endpoint
        router.use('/resource', ResourceRoutes.routes);

        //? User route endpoint
        router.use('/user', UserRoutes.routes);

        //? User route endpoint
        router.use('/userRol', UserRolRoutes.routes);

        return router;
    }
}