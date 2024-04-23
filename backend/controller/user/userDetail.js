const userModel = require("../../models/userModel");

async function userDetailsController(req,res){
    try{
        // console.log("userid",req.userId);
        const user = await userModel.findById(req.userId)


        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message: "user detail"
        })

        // console.log("user",user);

    }
    catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}

module.exports = userDetailsController