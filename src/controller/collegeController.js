
const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")

//======================================================= validation ===============================================================

const isValid = function (value) {
    if (typeof value === "undefined" || value === "null") return false;

    if (typeof value === 'string' && value.trim().length === 0) return false

    return true;
}

//==============================================**Regex for Url**=========================================================

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const clgNmaeRegex = /^([a-z]{2,})*$/
const clgFullNmaeRegex =/^([a-zA-Z \_\.\-\,]{5,})*$/






//=============================================** Create Collage **=========================================================

const createCollege = async function(req,res) {
    try {

       


        let data = req.body;
        const { name, fullName, logoLink } = data;

        if (Object.keys(data).length == 0) return res.status(400).send({status: false, message: "Data is not provided"})
        

        if (!isValid(name) || !name.match(clgNmaeRegex))  return res.status(400).send({status: false, message: "Please enter valid name"})
        
        if (!isValid(fullName)|| !fullName.match(clgFullNmaeRegex))  return res.status(400).send({status: false, message: "Please enter valid fullName"})

        if (!isValid(logoLink) || !logoLink.match(urlRegex))    return res.status(400).send({status: false, message: "Please enter valid logolink (Url in http:// formate)"})
        

        let duplicateName = await collegeModel.findOne({$or : [{name : name} , {fullName : fullName}]})

        if (duplicateName)  return res.status(400).send({status: false, message: "College name already exist (Abbrevation or Full name of College is already exist)"})


        const newCollege = await collegeModel.create(data);
        return res.status(201).send({status: true, message: "New College created" , data : newCollege })

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({status: false, message: err.message})
    }
}


//=========================================================**Get all detail**==========================================================

const getCollegeDetails = async function (req, res) {
    try {

       

        const query = req.query
        const collegeName = query.collegeName


        if (!isValid(collegeName))  return res.status(400).send({ status: false, message: "CollegeName is not valid or not provided." })
        

        const collegeDetails = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!collegeDetails)  return res.status(404).send({ status: false, msg: "There is no such a college with this name." })
        
        const internDetails = await internModel.find({ collegeId: collegeDetails._id , isDeleted: false }).select({ isDeleted: 0, collegeId: 0 , createdAt : 0 , updatedAt : 0 , __v : 0})

        if (internDetails.length == 0) return res.status(200).send({ status: false, message: "There are no intern in this college." })
        
        return res.status(200).send({ status: true, data: { name: collegeDetails.name, fullName: collegeDetails.fullName, logolink: collegeDetails.logoLink, interns: internDetails } })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { getCollegeDetails  ,createCollege  }