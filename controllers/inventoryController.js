const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//CREATE INVENTORY
const createInventoryController = async (req,res) => {
    try {
        const {email} = req.body
        //valodation
        const user = await userModel.findOne({email})
        if(!user){
             throw new Error('User not found')
        }
        // if(inventoryType === "in" && user.role !=='donar'){
        //      throw new Error('Not a donar account')
        // }
        // if(inventoryType === "out" && user.role !=='hospital'){
        //      throw new Error('Not a hospital')
        // }

         if(req.body.inventoryType=='out'){
            const requestedBloodGroup = req.body.bloodGroup
            const requestedQuantityOfBlood = req.body.quantity
            const organisation = new mongoose.Types.ObjectId(req.body.userId)

            //calculate blood quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType:'in',
                    bloodGroup:requestedBloodGroup
                }},{$group:{
                    _id:'$bloodGroup',
                    total:{$sum:'$quantity'}
                }}
            ])
           // console.log('Total In',totalInOfRequestedBlood)
           const totalIn = totalInOfRequestedBlood[0]?.total || 0
            //calculate OUT blood quantity

            const totalOutOfRequestedBlood = await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType:'out',
                    bloodGroup:requestedBloodGroup
                }},{$group:{
                    _id:'$bloodGroup',
                    total:{$sum:'$quantity'}
                }}
            ])
            const totalOut = totalOutOfRequestedBlood[0]?.total || 0

            //IN and OUT Calculation
             const availableQuantityOfBloodGroup = totalIn - totalOut
             
             //Quantity validation
             if(availableQuantityOfBloodGroup < requestedQuantityOfBlood){
                return res.status(500).send({
                    success:false,
                    message: `Only ${availableQuantityOfBloodGroup} ML of ${requestedQuantityOfBlood.toUpperCase()} is available`
                })
             }
             req.body.hospital = user?._id

         }else{
            req.body.donar = user?._id
         }

        // save record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return  res.status(201).send({
            success:true,
            message:"new blood record added"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Create Inventory Api',
            error
        })
    }

}


// GET HOSPITAL BLOOD RECORDS
const getInventoryHospitalController = async (req,res) => {
    try {
        const inventory = await inventoryModel.find(req.body.filters).populate("donar").populate("hospital").populate("organisation").sort({createdAt: -1});
      
        return res.status(200).send({
            success:true,
            message:'get Hospital consumer records successfully',
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Get consumer Inventory',
            error
        })
    }
}
//get Inventory Record
const getInventoryController = async (req,res) => {
    try {
        const inventory = await inventoryModel.find({organisation:req.body.userId}).populate("donar").populate("hospital").sort({createdAt: -1});
        return res.status(200).send({
            success:true,
            message:'get all rescords successfully',
            inventory
        })
    } catch (error) {
        console.log(error)  
        return res.status(500).send({
            success:false,
            message:'Error in Get all Inventory',
            error
        })
    }
}

//get DONAR RECORDS
const getDonarsController = async(req,res)=>{
    try {
        const organisation = req.body.userId
        //find Donars
        const donarId = await inventoryModel.distinct("donar",{organisation})
        // console.log(donarId)
        const donars = await userModel.find({_id: {$in:donarId}})

        return res.status(200).send({
            success:true,
            message:'Donar Record Fetched Successfully',
            donars,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Donar records',
            error
        })
    }
}

//get Hospital Records

const getHospitalController = async(req,res) =>{
    try {
        const organisation = req.body.userId
        //get Hospital ID
        const hospitalId = await inventoryModel.distinct("hospital",{organisation})
        // console.log(hospitalId)
        //Fnd Hospital
        const hospitals = await userModel.find({_id: { $in:hospitalId },})
        return res.status(200).send({
            success:true,
            message:'Hospital Data Fetched Successfully',
            hospitals,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get hospital API',
            error
        })
    }
}

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
    try {
      const inventory = await inventoryModel
        .find({organisation: req.body.userId,})
        .limit(3)
        .sort({ createdAt: -1 })
      return res.status(200).send({
        success: true,
        message: "recent Invenotry Data",
        inventory,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success: false,
        message: "Error In Recent Inventory API",
        error,
      })
    }
  }
  

//Get Organisation Record
const getOrganisationController = async(req,res)=>{
    try {
        const donar = req.body.userId
        //get Organisation ID
        const orgId = await inventoryModel.distinct("organisation",{donar})
        // console.log(orgId)
        //Find org
        const organisations = await userModel.find({_id: {$in:orgId}})

        return res.status(200).send({
            success:true,
            message:'Org Data Fetched Successfully',
            organisations,
        } )
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Organisation API',
            error,
        })
    }
}

//Get Organisation for Hospital 
const getOrganisationForHospitalController = async(req,res)=>{
    try {
        const hospital = req.body.userId
        //get Organisation ID
        const orgId = await inventoryModel.distinct("organisation",{hospital})
        // console.log(orgId)
        //Find org
        const organisations = await userModel.find({_id: {$in:orgId}})

        return res.status(200).send({
            success:true,
            message:'Hospital Org Data Fetched Successfully',
            organisations,
        } )
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Hospital Organisation API',
            error,
        })
    }
}

module.exports = {createInventoryController,getInventoryController,getDonarsController,getHospitalController,getOrganisationController,getOrganisationForHospitalController,getInventoryHospitalController,getRecentInventoryController};