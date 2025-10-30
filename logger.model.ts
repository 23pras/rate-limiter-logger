import mongoose from "mongoose";

const loggerSchema = new mongoose.Schema({

    ip : {
        type: String,
        required: true
    },
    route : {
        type: String,
        required: true
    },
    timestamp : {
        type: Date,
        required: true
    },
    blocked : {
        type: Boolean,
        required: true
    },
    method: String,
    url: String
});

const Logger =  mongoose.model('Logger' , loggerSchema);
export default Logger;