import { IAcademicSemester } from '../acadamicSemester/acadamicSemester.interface';
import { User } from './users.model'

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
    .sort(
      {
        createdAt: -1
      }
    )
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
}

export const generateStudentId = async (academicSemester: IAcademicSemester | null): Promise<string | undefined> => {
  const lastStudent = (await findLastStudentId() || (0).toString().padStart(5, '0'));

  let IncrementId = parseInt(lastStudent + 1).toString().padStart(5, '0');
  if (academicSemester) {
    return IncrementId = `${academicSemester.year.substring(2)}${academicSemester.code}${IncrementId}`
  }
}


const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
  return lastAdmin?.id ? lastAdmin.id.substring(4) : undefined;
}

export const genereateLastAdmin = async (): Promise<string | undefined> => {
  const lastAdmin = (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementId =  (parseInt(lastAdmin) + 1).toString().padStart(5, '0');
  return incrementId = `${'A'}${incrementId}`
}

//Generate Last Faculties User Id
const findLastFacultiesId = async (): Promise<string | undefined> => {
  const lastFacultiesUser = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
  return lastFacultiesUser?.id ? lastFacultiesUser.id.substring(4) : undefined;
}

export const generateLastFacultiesId = async (): Promise<string | undefined> => {
  const lastId = (await findLastFacultiesId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(lastId) + 1).toString().padStart(5, '0');
  return incrementId = `${'F'}${incrementId}`
}