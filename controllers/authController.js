const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
//for login web token is required
const jwt = require("jsonwebtoken");
const router = require("../routes/authRoutes");



//register call  
const registerController = async(req,res)=>{
        try {
            const exisitingUser = await userModel.findOne({email:req.body.email})
            //validation
            if(exisitingUser){
                return res.status(200).send({
                    success:false,
                    message:'User already exists'
                })
            }
            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt)
            req.body.password = hashedPassword
            //rest data
            const user = new userModel(req.body)
            await user.save()
            return res.status(201).send({
                success:true,
                message:"User registered successfully", 
                user,
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in register API',
                error
            })
        }

};




//login call 
const loginController = async(req,res)=>{
    try {
        const user = await userModel.findOne({email:req.body.email})
        //check for email
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Invalid credentials',
            });
        }
        //check Role
        if(user.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message:'Role does not  match'
            }); 
        }


        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:'Invalid credentials',
            });
        }
        //encrypt token if every thing goes right
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login api',
            error
        });
    }
}

// function to GET CURRENT USER
const currentUserController = async(req,res) => {
        try {
            const user = await userModel.findOne({_id: req.body.userId});
            return res.status(200).send({
                success:true,
                message:'User fetched successfully',
                user
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success:false,
                message:"Unable to grt current user",
                error
            })
        }
}

module.exports = {registerController , loginController, currentUserController};