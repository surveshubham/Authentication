const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define roles
        default: 'user'
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
