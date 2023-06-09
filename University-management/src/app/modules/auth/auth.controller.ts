import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import config from "../../../config";
import { ILoginResponse, IRefreshTokenResponse } from "./auth.interface";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result;

    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: others,
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'User loggedin successfully !',
        data: result,
    });
});

const updatePassword = catchAsync(async(req, res) => {
    const {...passwordInfo} = req.body;
    const user = req.user;
    const result = await AuthService.updatePassword(user,passwordInfo);
    sendResponse<IRefreshTokenResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'Successfully Password Udpated !'
    });
})

export const AuthController = {
    loginUser,
    refreshToken,
    updatePassword
}