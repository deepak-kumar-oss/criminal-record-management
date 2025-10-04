import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const jailerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure names are unique
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
jailerSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('Jailer', jailerSchema);