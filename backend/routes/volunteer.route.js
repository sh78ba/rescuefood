const auth_controller=require("../controllers/Auth.controller")
const volunteer_controller=require("../controllers/Volunteer.controller")
const auth_mw=require("../middlewares/Auth.mw")

module.exports=(app)=>{
    app.post("/rescuefood/api/v1/volunteer/signin",[auth_mw.verifyVolunteerSignInBody],auth_controller.volunteersignin);
    app.post("/rescuefood/api/v1/volunteer/signup",[auth_mw.verifyVolunteerSignUpBody],auth_controller.volunteersignup);
    app.post("/rescuefood/api/v1/volunteer/resetpasswordrequest",auth_controller.volunteerRequestPasswordReset);
    app.post("/rescuefood/api/v1/volunteer/resetpasswordlink",auth_controller.volunteerResetPassword);
    app.post("/rescuefood/api/v1/volunteer/updatelocation",volunteer_controller.volunteerLocationUpdate);
}