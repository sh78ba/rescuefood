const user_model=require("../models/User.model")
const volunteer_model=require("../models/Volunteer.model")
const restaurant_model=require("../models/Restaurant.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config=require("../configs/config")
const nodemailer=require("nodemailer")


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

exports.volunteerRequestPasswordReset=async(req,res)=>{
    const req_email=req.body.email;
try{
    const get_User=await volunteer_model.findOne({email:req_email})
    if(!get_User){
        return res.status(404).send({
            message:"Email doesn't exists!"
        })
    }
    const secret = process.env.SECRET_JWT + get_User.email;
    const token = jwt.sign({ email: get_User.email }, secret, { expiresIn: 3600 });


    const resetURL=config.volunteerResetPasswordURL+`?email=${get_User.email}&token=${token}`;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });
  
      const mailOptions = {
        to: get_User.email,
        from: process.env.APP_EMAIL,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetURL}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }


}


//volunter reset password 
exports.volunteerResetPassword = async (req, res) => {
    const token = req.body.token;
    const password = req.body.password;
    const email = req.body.email;

  
    try {
      // Validate input
      if (!token || !password || !email) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      // Find user
      const user = await volunteer_model.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      // Construct secret
  
      // Verify token
      const secret = process.env.SECRET_JWT + user.email;
let verify;
try {
    verify = jwt.verify(token, secret);
} catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(400).json({ message: "Invalid or expired token" });
}

  
      // Hash the new password
      const encryptedPassword = await bcrypt.hash(password, 8);
  
      // Update user's password
      await volunteer_model.updateOne(
        { email },
        { $set: { password: encryptedPassword } }
      );
  
      res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
      console.error("Error resetting password:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
//volunteer location update




/*********************************************************************************/

/*******************For Restaurant******************************/




/*******************For User******************************/

