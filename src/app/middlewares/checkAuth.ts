import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import httpStatus from 'http-status-codes'

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(httpStatus.BAD_REQUEST, 'No Token Received')
        }

        // const verifiedToken = jwt.verify(accessToken, 'secrect')
        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(httpStatus.BAD_REQUEST, 'You are not permitted')
        }

        req.user = verifiedToken

        next()
    } catch (error) {
        next(error)
    }
}
