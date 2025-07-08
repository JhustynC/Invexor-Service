import {Router} from "express";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        //? Test Endpoint 
        router.use('/api', (req, res) => {
            console.log('REQUEST');
            res.json({message: "REQUEST"});
        });

        //? Main route endpoint
        // router.use('/user', UserRoutes.routes);

        return router;
    }
}