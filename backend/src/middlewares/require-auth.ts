import {Request, Response, NextFunction} from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        res.send(501).json({message : 'current user not'})
    }
    next();
};

