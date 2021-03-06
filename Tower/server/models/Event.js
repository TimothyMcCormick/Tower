import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


export const EventSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
},
  { timestamps: true, toJSON: { virtuals: true } }
)


EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})