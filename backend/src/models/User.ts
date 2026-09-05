import mongoose, { Schema } from 'mongoose'

const geoSchema = new Schema(
  {
    lat: { type: String, required: true, trim: true },
    lng: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const addressSchema = new Schema(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    zipcode: { type: String, required: true, trim: true },
    geo: { type: geoSchema, required: true },
  },
  { _id: false },
)

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true, collection: 'users' },
)

userSchema.virtual('id').get(function () {
  return String(this._id)
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
})

export const User = mongoose.model('User', userSchema)
