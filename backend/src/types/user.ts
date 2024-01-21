import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    userType: 'expert' | 'children' | 'parent' | 'content creator';
    userName: string;
}
