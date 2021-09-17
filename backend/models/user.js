import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// Define a schema for the users model
var UserSchema = new Schema ({
    firstName:  {type: String, required: true,  maxLength: 30},
    middleName: {type: String, required: false, maxLength: 30},
    lastName:   {type: String, required: true,  maxLength: 30},
    nickname:   {type: String, required: false, maxlength: 30},
    username:   {type: String, required: true,  maxLength: 30},
    email:      {type: User, required: true,  maxLength: 50},
});

// Formal name virtual
UserSchema.virtual('formalName').get(function () {
  return `${this.lastName}, ${this.firstName}`;
});

// Full name virtual
UserSchema.virtual('fullName').get(function () {
    if (middleName) {
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
    } else {
        return `${this.firstName} ${this.lastName}`;
    }
});

// Export model
module.exports = mongoose.model('User', UserSchema);
