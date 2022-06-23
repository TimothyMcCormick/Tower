import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


export const CommentSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  eventId: { type: ObjectId, required: true, ref: 'Event' },
  body: { type: String, required: true },
  isAttending: { type: Boolean, required: false, }
},
  { timestamps: true, toJSON: { virtuals: true } }
)


CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})