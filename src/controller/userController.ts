import { ObjectId } from "mongodb";
import User, { IUser, UserDoc } from "../models/userModel";

// List of labeled users
const labelList: string[] = [ "010", "020", "021", "052", "053", "056", "058", "059", "060", "062",
    "064", "065", "067", "068", "069", "073", "075", "076", "078", "080",
    "081", "082", "084", "085", "086", "087", "088", "089", "091", "092",
    "096", "097", "098", "100", "101", "102", "104", "105", "106", "107",
    "108", "110", "111", "112", "114", "115", "116", "117", "118", "124",
    "125", "126", "128", "129", "136", "138", "139", "141", "144", "147",
    "153", "154", "161", "163", "167", "170", "174", "175", "179"];


// Add user to database
export const addUser = async(userId: string) => {
    if (userId === undefined || !userId) {
        throw new Error("error")
    }

    const existUser: UserDoc | null = await User.findById({'_id': userId})

    if(existUser !== null) {
        return 
    }

    let userHasLabels = false

    if(labelList.includes(userId)) {
        userHasLabels = true
    }

    const newUser: IUser = {
        _id:  userId,
        has_labels: userHasLabels,
        activity_ids: []
    }

    const resUser: UserDoc = User.build(newUser);  
    await resUser.save()
    
    return resUser
};

// Add found activity to user
export const addActivityToUser = async (userId: string, activity_id: string) => {
    if (userId === undefined || !userId) {
        throw new Error("error")
    }

    const updateUser: UserDoc | null = await User.findByIdAndUpdate({'_id': userId}, { $addToSet: {activity_ids: activity_id}})

    if(updateUser === null) {
        throw new Error("error")
    }
    
    return activity_id
}

export const findUsers = async () => {
    console.log("Finding users...")
    const labeledUsers: UserDoc[] = await User.find({ '_id': labelList }).exec()
    console.log(labeledUsers.length)
    return labeledUsers;
}

export const updateHasLabel = async () => {
    for (const user of labelList) {
        const updatedUser: UserDoc | null = await User.findByIdAndUpdate({ '_id': user }, {"has_labels": true}).exec()
        return console.log(updatedUser?._id, updatedUser?.has_labels) 
    }
}