import { Schema, model, Types } from 'mongoose'

const workoutPlanSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    sessions: [
      {
        day: String,
        focus: String,
        exercises: [{ name: String, sets: Number, reps: Number, duration: Number }],
      },
    ],
  },
  { timestamps: true },
)

export const WorkoutPlan = model('WorkoutPlan', workoutPlanSchema)
