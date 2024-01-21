import {Request, Response, NextFunction} from "express";
import {IUserPayload} from "../types/user-payload";
import {JwtService} from "../services/jwt-service";

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }
    try {
        const payload = JwtService.verify(req.session.jwt) as IUserPayload;
        req.currentUser = payload;
    } catch (err) {
        res.send(501).json({message : 'currentUser error'})
    }

    return next();
};