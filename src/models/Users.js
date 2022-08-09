import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'Please add a name']
    },
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: [true, 'Duplicate Field found. use your own credentials.'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ],
      index: true
    },
    dateOfBirth: {
      type: Date
    },
    profilePic: {
      type: String
    },
    phoneNumber: {
      type: Number,
      validate: {
        validator(value) {
          return /d{10}/.test(value);
        },
        message: '{VALUE} is not a valid 10 digit number!'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { collection: 'users' }
);

UserSchema.pre('save', function preSave(next) {
  this.updatedAt = Date.now();
  return next();
});

UserSchema.methods.toJSON = function excludeSomeFields() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model('User', UserSchema);
