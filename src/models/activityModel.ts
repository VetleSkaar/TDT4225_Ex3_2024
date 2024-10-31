import { ObjectId } from "mongodb";
import mongoose from "mongoose";


// Model defs for activities
export interface IActivity {
    _id: ObjectId,
    transportation_mode?: string,
    start_date_time: Date,
    end_date_time: Date,
    trackpoint_ids: ObjectId[]
}

export interface ActivityDoc extends mongoose.Document {
    _id: IActivity["_id"],
    transportation_mode: IActivity["transportation_mode"],
    start_date_time: IActivity["start_date_time"],
    end_date_time: IActivity["end_date_time"],
    trackpoint_ids: IActivity["trackpoint_ids"]
}

export interface ActivityModelInterface extends mongoose.Model<ActivityDoc> {
    build(attr: IActivity): ActivityDoc
}

const activitySchema = new mongoose.Schema<ActivityDoc> ({
        _id: {
            type: ObjectId
        },
        transportation_mode: {
            type: String,
            required: false
        },
        start_date_time: {
            type: Date,
            required: true
        },
        end_date_time: {
            type: Date,
            required: true
        },
        trackpoint_ids: [
            {
                type: ObjectId
            }
        ]
    },
    { collection: "activity", _id: false }
)

activitySchema.statics.build = (attr: IActivity) => {
    return new Activity(attr);
}


const Activity = mongoose.model<ActivityDoc, ActivityModelInterface>("activity", activitySchema)

export default Activity