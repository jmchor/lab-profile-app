const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },

    password: {
      type: String,
      required: [true, 'Password is required.'],
    },

    campus: {
      type: String,
      enum: [
        'Madrid',
        'Barcelona',
        'Miami',
        'Paris',
        'Berlin',
        'Amsterdam',
        'México',
        'Sao Paolo',
        'Lisbon',
        'Remote',
      ],
    },
    course: {
      type: String,
      enum: ['Web Dev', 'UX/UI', 'Data Analytics', 'Cyber Security'],
    },
    image: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
