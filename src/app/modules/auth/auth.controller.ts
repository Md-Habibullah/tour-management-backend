/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { UserServices } from "../user/user.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes'
import { AuthServices } from "./auth.service"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'User Login Successfully',
        success: true,
        data: loginInfo,
    })
})

export const AuthControllers = {
    credentialsLogin
}