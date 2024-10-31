import TrackPoint, { ITrackPoint, TrackPointDoc } from "../models/trackPointModel";

// Add trackpoints to database
export const addTrackPoints = async(trackPoints: ITrackPoint[]) => {
    if(trackPoints.length === 0 || !trackPoints) {
        return []
    }

    const tp: TrackPointDoc[] = await TrackPoint.insertMany(trackPoints)

    if(tp.length === 0) {
        return []
    }

    return tp
};