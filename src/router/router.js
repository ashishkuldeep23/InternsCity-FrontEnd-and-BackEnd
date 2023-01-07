
const express = require('express');
const router = express.Router();

//=====================================================** Controller improt** =====================================================

const internController = require('../controller/internController')
const collegeController = require('../controller/collegeController')


//======================================================** API's** ================================================================

router.post("/colleges" , collegeController.createCollege)

router.post("/interns" , internController.createIntern)

router.get("/collegeDetails" , collegeController.getCollegeDetails)


router.get("*" , (req , res)=>{
    res.sendFile(process.cwd() + "/public/pageNotFound.html")
    // res.send({status : false , message :`Page Not Found , Given URL ${req.url} is incorrect for this application.`})
})

module.exports = router