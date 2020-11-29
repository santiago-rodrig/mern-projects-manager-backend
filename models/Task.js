const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
})
exports = mongoose.model('Task', taskSchema)
