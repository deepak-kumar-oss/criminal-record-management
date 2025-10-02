import mongoose from 'mongoose';    

const criminalSchema = new mongoose.Schema({
    name:{
        type: String,
        require : true
    },
    age:{
        type: Number,
        require : true
    },
    crime: {
        type: String,
        require : true
    },
    sentence : {
        type: String,
        require : true
    },
    jailLocation : {
        type: String,
        require : true
    },
    dateOfArrest : { 
        type: Date,
        require : true
    }   
})

export default mongoose.model('Criminal', criminalSchema);