import {Router} from "express";
import { UserRoutes } from "./user/user.routes";
import { AreaRoutes } from "./area/area.routes";
import { BranchRoutes } from "./branch/branch.routes";
import { ItemRoutes } from "./item/item.routes";
import { ResourceRoutes } from "./resource/resource.routes";
import { EntityRoutes } from "./entity/entity.routes";
import { ItemTypeRoutes } from "./itemType/itemType.routes";
import { UserRolRoutes } from "./userRol/userRol.routes";
import { FormTemplateRoutes } from "./form-template/form-template.routes";
import { CustomPropertyRoutes } from "./custom-property/custom-property.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        /**
         * @swagger
         * /api:
         *   get:
         *     summary: API Health Check
         *     tags: [Health]
         *     responses:
         *       200:
         *         description: API is running
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Invexor Service API is running"
         *                 status:
         *                   type: string
         *                   example: "OK"
         */
        router.use('/api', (req, res) => {
            console.log('API Health Check Request');
            res.json({
                message: "Invexor Service API is running",
                status: "OK",
                timestamp: new Date().toISOString()
            });
        });

        //? Area route endpoint
        router.use('/area', AreaRoutes.routes);

        //? Branch route endpoint
        router.use('/branch', BranchRoutes.routes);

        //? Entity route endpoint
        router.use('/entity', EntityRoutes.routes);

        //? Item route endpoint
        router.use('/item', ItemRoutes.routes);
        
        //? ItemType route endpoint
        router.use('/itemType', ItemTypeRoutes.routes);

        //? Resource route endpoint
        router.use('/resource', ResourceRoutes.routes);

        //? User route endpoint
        router.use('/user', UserRoutes.routes);

        //? UserRol route endpoint
        router.use('/userRol', UserRolRoutes.routes);
        
        //? Templates route endpoint
        router.use('/template', FormTemplateRoutes.routes);

        //? Custom Property route endpoint
        router.use('/customProperty', CustomPropertyRoutes.routes);

        return router;
    }
}