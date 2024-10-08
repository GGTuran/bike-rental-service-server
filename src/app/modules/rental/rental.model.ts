import { Schema, model } from "mongoose";
import { TRental } from "./rental.interface";

const rentalSchema = new Schema<TRental>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bikeId: {
        type: Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    returnTime: {
        type: Date,
        default:null,
    },
    totalCost: {
        type: Number,
        default:0,
    },
    isReturned: {
        type: Boolean,
        default: false,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    transactionId: {
        type: String,
        required: true
    },
},
{
    versionKey:false,
}
);

export const Rental = model<TRental>('Rental',rentalSchema);