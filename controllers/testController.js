 const testController=(req,res)=>{
    res.status(200).send({
        message:" testing route",
        success: true
    });
}
module.exports={testController};
