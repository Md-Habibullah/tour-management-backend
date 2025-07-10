/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { UserServices } from "./user.service";
// import AppError from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw new AppError(400, 'error from AppError')
        // throw new Error('error from Error')
        const user = await UserServices.createUser(req.body)

        res.status(httpStatus.CREATED).json({
            message: 'User created successfully',
            user
        })

    } catch (err: any) {
        // eslint-disable-next-line no-console
        console.log(err.name)
        next(err)
        // res.status(400).json({ m: err.message, err })
    }
}

export const userControllers = {
    createUser
}