//====================================================** Model improt are **===================================================

const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")


//=====================================================** Some Imp. Regex are **====================================================

const nameReg = /^([A-Za-z ]+){3,}$/
const emailReg = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/
const mobileReg = /^([+]\d{2})?\d{10,}$/

// // // OldForEmail --> /^([a-z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,20})$/

//===================================================** validation **===================================================================

const isValid = function (value) {
    if (typeof value === "undefined" || value === "null") return false;

    if (typeof value === 'string' && value.trim().length === 0) return false

    return true;
}



//===================================================** Create intern** ===========================================================

const createIntern = async function (req, res) {

    try {

      
        

        let body = req.body

        let { name, mobile, email, collegeName } = body

        // // // If body is empty
        if (Object.keys(body).length <= 0) return res.status(400).send({ status: false, message: "Give some data to create " })

        // // if name is not given and not match with regex and not should empty
        if (!isValid(name) || !name.match(nameReg)) return res.status(400).send({ status: false, message: "Name is not given or Invalid formate for Name." })

        // // if mobile is not given and not match with regex and not should empty
        if (!isValid(mobile) || !mobile.match(mobileReg)) return res.status(400).send({ status: false, message: "Mobile is not given or Invalid formate for Mobile." })

        // // if email is not given and not match with regex and not should empty
        if (!isValid(email) || !email.match(emailReg)) return res.status(400).send({ status: false, message: "Email is not given or Invalid formate for Email." })

        // // if collegeName is not given and not should empty
        if (!isValid(collegeName)) return res.status(400).send({ status: false, message: "college Name is not given or Invalid formate for College Name." })


        let alreadyData = await internModel.findOne({$or : [{mobile : mobile} , {email : email}]})

        if(alreadyData) return res.status(400).send({ status: false, message: "Email or Mobile is already used." })

        let collegeIdByClgName = await collegeModel.findOne({ name : collegeName , isDeleted : false })

        if (!collegeIdByClgName) return res.status(404).send({ status: false, message: "Given College Name is not present in DB or Deleted in DB" })

        body.collegeId = collegeIdByClgName._id

        let newInternData = await internModel.create(body)

        res.status(201).send({ status: true, message: "Intern created successfully", data: newInternData })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = { createIntern }