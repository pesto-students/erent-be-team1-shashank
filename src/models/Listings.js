// eslint-disable-next-line import/no-import-module-exports
import mongoose from 'mongoose';
import slugify from 'slugify';

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a Title'],
      unique: true
    },
    slug: {
      type: String,
      unique: true
    },
    adType: {
      type: String,
      trim: true,
      required: [true, 'Please Select a Ad type'],
      enum: ['Sell', 'Buy', 'Rent']
    },
    category: {
      type: String,
      required: [true, 'Please Select Ad Category'],
      enum: [
        'Apartments',
        'Commercial',
        'Office',
        'Restaurant',
        'Studio Home',
        'Villa'
      ]
    },
    priceType: {
      type: String,
      enum: ['Fixed', 'Negotiable', 'On Call']
    },
    priceRange: {
      low: Number,
      high: Number
    },
    priceUnit: {
      type: String,
      required: [true, 'Please Select a Price Unit']
    },
    parking: {
      type: Boolean,
      default: false
    },
    bathroom: {
      type: Number,
      required: [true, 'Please Select Number of Bathroom']
    },
    sqft: {
      type: Number,
      required: [true, 'Please Add room sqft']
    },
    location: {
      type: String,
      required: [true, 'Please add location details']
    },
    buildYear: {
      type: Number,
      required: [true, 'Please provide build year']
    },
    amentities: {
      type: [String],
      required: [true, 'Please provide at least two amentities']
    },
    description: String,
    images: [String],
    videoUrl: String,
    contactDetails: {
      state: {
        type: String,
        required: [true, 'Please provide correct State']
      },
      zipCode: {
        type: String,
        required: [true, 'Please provide correct Zip Code']
      },
      address: String,
      phone: {
        type: String,
        required: [true, 'Please provide owner contact number']
      },
      whatsappNumber: String,
      email: String,
      map: {
        lat: Number,
        long: Number
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    isPremium: false,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { collection: 'listings' }
);

// Create Listing slug from the title
ListingSchema.pre('save', function slugifyTitle(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

ListingSchema.pre('save', function preSave(next) {
  this.updatedAt = Date.now();
  return next();
});

ListingSchema.methods.toJSON = function excludeSomeFields() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model('Listings', ListingSchema);
