import catchAsync from '../../../shared/catchAsync'
import { UserService } from './users.service';
import sendResponse from '../../../shared/sendResponse';
import { RequestHandler } from 'express';
import { IUser } from './users.interface';

const createStudent: RequestHandler = catchAsync(
  async (req, res) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudentService(student, userData);

    sendResponse<IUser>(res, {
      statusCode: 200,
      message: "User Successfully Craeted!!",
      success: true,
      data: result,
    })
  })

const createAdmin: RequestHandler = catchAsync(
  async (req, res) => {
    const { admin, ...othersData } = req.body;
    const result = await UserService.createAdminService(admin, othersData);

    sendResponse<IUser>(res, {
      statusCode: 200,
      message: "Admin Successfully Craeted!!",
      success: true,
      data: result,
    })
  }
);

const createFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const { faculty, ...othersData } = req.body;
    const result = await UserService.createFacultyService(faculty, othersData);
    sendResponse<IUser>(res, {
      statusCode: 200,
      message: "Faculty User Successfully Created!!",
      success: true,
      data: result,
    })
  }
)


const getAllUsers: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await UserService.getAllUser();
    sendResponse<IUser[]>(res, {
      statusCode: 200,
      message: "Successfully Retrieve all the user !!",
      success: true,
      data: result,
    })
  })
export const UserController = {
  createStudent,
  createAdmin,
  createFaculty,
  getAllUsers
}
