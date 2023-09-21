const mongoose = require('mongoose') //mongoose is a popular library for Node.js used to interact with MongoDB


const inventorySchema = new mongoose.Schema({
        inventoryType:{
            type:String,
            required:[true,'Inventory type is require'],
            enum:['in' , 'out'],
        },
        bloodGroup:{
            type:String,
            required:[true,'Blood group type is require'],
            enum:['O+', 'O-', 'AB+', 'AB-', 'A+','A-', 'B+', 'B-'],
        },
        quantity:{
            type:Number,
            required:[true,'Blood quantity is require'],
        },
        email:{
           type:String,
           required:[true,"Donar Email is Required"]
        },
        organisation:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required:[true,'organisation is required'],
        },
        hospital:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: function(){
                return this.inventoryType === 'out'
            }
        },
        donar:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: function(){
                return this.inventoryType === 'in'
            }
        }, 
},
 {timestamps : true}
)

module.exports = mongoose.model("Inventory",inventorySchema);