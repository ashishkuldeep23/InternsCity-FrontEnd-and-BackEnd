const mongoose = require("mongoose")
const collegeSchema = new mongoose.Schema({

    name:{ type: String, required: true, unique:true, lowercase:true, trim: true },

    fullName:{ type: String, required: true, unique: true, trim: true },

    logoLink:{ type: String,trim: true },

    isDeleted:{ type: Boolean, default: false },

},{ timestamps: true })

module.exports = mongoose.model("college", collegeSchema)