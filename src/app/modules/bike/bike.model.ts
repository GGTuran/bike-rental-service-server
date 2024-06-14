import { Schema, model } from "mongoose";
import { TBike } from "./bike.interface";

const BikeSchema = new Schema<TBike>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    cc: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
},
{
    versionKey:false,
}
);

//hiding deleted bikes
// BikeSchema.pre('find', function(next){
//     this.find({isAvailable : { $ne:false }});
//     next();
// })

export const Bike = model<TBike>('Bike', BikeSchema)