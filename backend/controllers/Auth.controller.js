const user_model=require("../models/User.model")
const volunteer_model=require("../models/Volunteer.model")
const restaurant_model=require("../models/Restaurant.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


/***********For Volunteer  **********/
//volunteer signup
exports.volunteersignup=async(req,res)=>{
    const request_body=req.body

    const volunteerObject={
        name:request_body.name,
        email:request_body.email,
        phone:request_body.phone,
        location:request_body.location,
        password:bcrypt.hashSync(request_body.password,8)
    }

    try{
        const created_volunteer=await volunteer_model.create(volunteerObject);

        res.status(201).send({message:"SignUp Successfull!! Please SignIn"})
    }catch(err){
        console.log("Error while registering the volunteer",err)
        res.status(500).send({
            message:"Error while registering the volunteer"
        })
    }
}

//volunteer signup
exports.volunteersignin=async(req,res)=>{
    const request_body=req.body
    
    const getUser=await volunteer_model.findOne({email:request_body.email})

    if(getUser==null){
        res.status(400).send({
            message:"Email is not valid"
        })
    }

    const isPasswordValid=bcrypt.compareSync(request_body.password,getUser.password)

    if(!isPasswordValid){
        res.status(401).send({
            message:"Invalid Password !!"
        })
    }

    const token=jwt.sign({email:getUser.email},process.env.SECRET_JWT,{
        expiresIn:604800
    })

    res.status(200).send({
        name:getUser.name,
        email:getUser.email,
        accessToken:token
    })

}

//volunteer forgot password


//volunteer location update




/*********************************************************************************/

/*******************For Restaurant******************************/




/*******************For User******************************/

