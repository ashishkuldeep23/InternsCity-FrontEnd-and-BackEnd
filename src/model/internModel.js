const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: "Name is mandatory",
        trim: true
    },

    email:
    {
        type: String,
        unique: true,
        required: "email is required"
    },

    mobile:
    {
        type: String,
        unique: true,
        required: "mobile number mandatory"
    },

    collegeId:
    {
        type: ObjectId,
        ref: "college",
        required : true
    },

    isDeleted:
    {
        type: Boolean,
        default: false
    }

},
    { timestamps: true }

)

module.exports = mongoose.model("intern", internSchema)