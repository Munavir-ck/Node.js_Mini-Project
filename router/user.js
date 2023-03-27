const { Router } = require("express")
const express=require("express")
const router=express.Router()
const {userHome,
    postSignup,
    signup,
    home,
    postLogin,
    userLogout
} = require("../controllers/userController")


router.get("/",userHome)
router.get("/signup",signup)
router.get("/home",home)
router.post("/postHome",postSignup)
router.post("/home",postLogin)
router.get("/logout",userLogout)


module.exports=router