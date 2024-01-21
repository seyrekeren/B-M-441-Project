import {Request, Response, NextFunction} from "express";

export const hotelAdminControl =  (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.currentUser?.userType;
    if (!(userRole == 'hotelAdmin')) {
        res.send(501).json({message : 'yetkisiz erişim'})
    }
    next();
};
