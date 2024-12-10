const auth_controller=require("../controllers/auth.controller")

module.exports=(app)=>{
    app.post("/rescuefood/api/v1/volunteer/signin",auth_controller.volunteersignin)
    app.post("/rescuefood/api/v1/volunteer/signup",auth_controller.volunteersignup)
}