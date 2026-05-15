import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { GuideStatus, IGuide } from "./guides.interface";
import { Guide } from "./guides.model";
import { User } from "../user/user.model";
import { QueryBuilder } from "../../utils/queryBuilder";
import { searchFields } from "../../utils/constants";
import { Role } from "../user/user.interface";
//* Features:
// Accepts a file upload (NID photo).
// Requires divisionId in the request body.
// Validates the request using Zod schema.
// Response: Success message with created application data.
// Prevents duplicate applications by the same user.

const applyguides = async (payload: IGuide) => {
  const isUserExists = await User.findById(payload.user);

  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "user does nott exists", "");
  }

  const isUserApplyExists = await Guide.findOne({ user: payload.user });

  if (isUserApplyExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You already applied for guide",
      "",
    );
  }

  const createGuideApplication = await Guide.create(payload);
  return createGuideApplication;
};

const getALLGuidesApplicants = async (query: Record<string, string>) => {

    const baseQuery = Guide.find({})
         .populate("user", "name email address")
         .populate("division", "name")
    
  const queryBuilder = new QueryBuilder( baseQuery,query );

  queryBuilder.search(searchFields).sort().filter().paginate();

  const [data, meta] = await Promise.all([
    queryBuilder.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const approveAsGuide = async (id:string, status:string) => {

    console.log(status);
    
  const isGuideApplicant = await Guide.findById(id);

  if (!isGuideApplicant) {
    throw new AppError(httpStatus.BAD_REQUEST, "user does not exists", "");
  }

  const updateGuide = await Guide.findByIdAndUpdate(
    id,
    {status : status}
  )

  if (updateGuide?.status === GuideStatus.REJECTED) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are rejected as a Guide applicant", '')
  }

  
  const updateUserRole = await User.findByIdAndUpdate(isGuideApplicant.user, 
    {role: Role.GUIDE},
    {new:true}
  )

  return {
    updateGuide,
    updateUserRole
  }
};

export const GuideServices = {
  applyguides,
  approveAsGuide,
  getALLGuidesApplicants,
};
