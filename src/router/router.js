
const express = require('express');
const router = express.Router();

//=====================================================** Controller improt** =====================================================

const internController = require('../controller/internController')
const collegeController = require('../controller/collegeController')


//======================================================** API's** ================================================================

router.post("/functionup/colleges" , collegeController.createCollege)

router.post("/functionup/interns" , internController.createIntern)

router.get("/functionup/collegeDetails" , collegeController.getCollegeDetails)


module.exports = router