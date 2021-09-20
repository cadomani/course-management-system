const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define a schema for the users model
const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 30 },
  middleName: { type: String, required: false, maxLength: 30 },
  lastName: { type: String, required: true, maxLength: 30 },
  nickname: { type: String, required: false, maxlength: 30 },
  username: { type: String, required: true, maxLength: 30 },
  email: { type: String, required: true, maxLength: 50 },
}, {
  timestamps: true,
});

/* eslint func-names: ["error", "never"] */
// Formal name virtual
UserSchema.virtual('formalName').get(function () {
  return `${this.lastName}, ${this.firstName}`;
});

// Full name virtual
UserSchema.virtual('fullName').get(function () {
  if (this.middleName) {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
  return `${this.firstName} ${this.lastName}`;
});

// Export model
module.exports = mongoose.model('User', UserSchema);
