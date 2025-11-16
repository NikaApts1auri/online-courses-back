const { default: mongoose, Schema } = require("mongoose");


const curseSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    level: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    curriculums: [{
        title: { type: String, required: true },
        description: { type: String },
        order: { type: Number },
        lessons: [{
            title: { type: String, required: true },
            content: { type: String },
            duration: { type: Number }
        }]
    }]
})

module.exports = mongoose.model('curse', curseSchema)