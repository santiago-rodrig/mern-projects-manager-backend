const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})
exports.default = mongoose.model('Project', projectSchema)
