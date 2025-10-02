import mongoose from 'mongoose';

const jailerSchema = new mongoose.Schema({
    name:{
        type: String,
        require : true
    },
    password:{
        type: String,
        require : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Jailer', jailerSchema);