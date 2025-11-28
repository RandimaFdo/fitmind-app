import { Schema, model, Types } from 'mongoose'

const progressSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    metrics: {
      weightKg: Number,
      bodyFat: Number,
      restingHeartRate: Number,
    },
    notes: String,
  },
  { timestamps: true },
)

export const Progress = model('Progress', progressSchema)
