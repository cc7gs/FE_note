import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import {newToken,verifyToken} from '../utils/auth'
import NotFoundException from '../expceptions/notFoundException'
import HttpException from '../expceptions/httpException'


class AuthController {
    static signup = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.email || !req.body.password) {
            next(new HttpException(400, 'need email password'))
        }
        try {
            const user = await User.create(req.body);
            const token = newToken(user);
            next(new HttpException(200, token))
        } catch (err) {
            next(new HttpException(500, `注册失败:${err}`))
        }
    }
    static signin = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.email || !req.body.password) {
            next(new HttpException(400, 'need email password'))
        }
        try {
            const user = await User.findOne({ email: req.body.email })
                .select('email password')
                .exec();
            if (!user) {
                next(new NotFoundException(req.body.email))
            }
            const match = await user!.checkPassword(req.body.password);
            if (!match) {
                next(new HttpException(401, 'Invalid email and passoword combination'))
            }
            const token = newToken(user);
            next(new HttpException(200, token))
        } catch (error) {
            console.error(error, 'signin')
            next(new HttpException(500, '登录失败'))
        }
    }
    static protect = async (req: Request, res: Response, next: NextFunction) => {
        const bearer = req.headers.authorization;
        if (!bearer || !bearer.startsWith('Bearer ')) {
            next(new HttpException(401, '没有权限访问'))
        }
        const token = bearer!.split('Bearer ')[1].trim();
        let payload: any;
        try {
            payload = await verifyToken(token)

        } catch (err) {
            next(new HttpException(401, 'token 失效'))
        }

        const user = await User.findById(payload.id)
            .select('-password')
            .lean()
            .exec()

        if (!user) {
            next(new HttpException(401, 'not user'))
        }
        req.user = user
        next()
    }
    
}
export default AuthController