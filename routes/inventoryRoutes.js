const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventoryController');


const router = express.Router();

//routes
//ADD INVENTORY || POST
router.post('/create-inventory', authMiddleware, createInventoryController); // middleware so that only authorised user can use.


//GET ALL BLOOD RECORDS
router.get('/get-inventory',authMiddleware,getInventoryController)

//GET Recent BLOOD RECORDS
router.get('/get-recent-inventory',authMiddleware,getRecentInventoryController)

//GET HOSPITAL BLOOD RECORDS
router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController)

//GET DONAR RECORDS
router.get('/get-donars',authMiddleware,getDonarsController)

//GET HOSPITALS RECORDS
router.get('/get-hospitals',authMiddleware,getHospitalController)


//GET ORGANISATION RECORDS
router.get('/get-organisation',authMiddleware, getOrganisationController)

//GET ORGANISATION For HOSPITAL  RECORDS
router.get('/get-organisation-for-hospital',authMiddleware, getOrganisationForHospitalController)

module.exports = router