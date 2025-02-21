const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  activationDate: {
    type: Date
  },
  expirationDate: {
    type: Date
  },
  discount: {
    type: Number,
    default: 0
  },
  used: {
    type: Boolean,
    default: false
  },
  isExpired: {
    type: Boolean,
    default: false
  },
  per: {
    type: String,
    enum: ["Percentage", "Amount"]
  },
}, { timestamps: true });
couponSchema.pre('save', function (next) {
  const currentDate = new Date();
  if (this.expirationDate && this.expirationDate < currentDate) {
    this.isExpired = true;
  }
  next();
});
couponSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  const currentDate = new Date();
  const expirationDate = update.expirationDate || (update.$set && update.$set.expirationDate);
  if (!update.$set) {
    update.$set = {};
  }
  if (expirationDate) {
    update.$set.isExpired = new Date(expirationDate) < currentDate;
  }
  next();
});
const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
