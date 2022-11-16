const mongoose = require('mongoose');


const templateSchema = new mongoose.Schema({
    category: {
        type: String,
        trim: true,
        required: true
    },
    file: {
        type: String,
        trim: true,
        required: true
    },

})

const Template = mongoose.model("conference template",templateSchema);

module.exports = Template;