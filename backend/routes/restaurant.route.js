const auth_controller=require("../controllers/Auth.controller")
const auth_mw=require("../middlewares/Auth.mw")

module.exports=(app)=>{
    app.post("/rescuefood/api/v1/restaurant/signin",[auth_mw.verifySignInBody],auth_controller.restaurantsignin)
    app.post("/rescuefood/api/v1/restaurant/signup",[auth_mw.verifyRestaurantSignUpBody],auth_controller.restaurantsignup)
    app.post("/rescuefood/api/v1/restaurant/resetpasswordlink",auth_controller.restaurantRequestPasswordReset)
    app.post("/rescuefood/api/v1/restaurant/resetpasswordrequest",auth_controller.restaurantResetPassword)
}