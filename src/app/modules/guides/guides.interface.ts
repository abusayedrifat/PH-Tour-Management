import { Types } from 'mongoose';
// user: ObjectId (ref: "User", required, unique)
// nidPhoto: string (required)
// division: ObjectId (ref: "Division", required)
// status: enum("PENDING", "APPROVED", "REJECTED") default: "PENDING"

export enum GuideStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface IGuide {
    user: Types.ObjectId,
    nidPhoto: string[],
    division: Types.ObjectId,
    status: GuideStatus
}