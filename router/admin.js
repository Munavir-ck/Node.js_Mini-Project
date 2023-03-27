const express=require("express")
const router=express.Router()
 const{
    adminLogin,
    adminPostLogin,
    adminHome,
    finduser,
    edituser,
    editsubmit,
    deleteuser,
    searchdata,
    adduser,
    submitadduser,
    logoutadmin,
 }=require("../controllers/admincontroller")

router.get("/",adminLogin)
router.get("/adminhome",adminHome)
 router.post("/adminLogin",adminPostLogin)
router.get("/finduser",finduser)
router.get("/edituser/:id",edituser)
router.post("/editsubmit/:id",editsubmit)
router.get("/deleteuser/:id",deleteuser)
router.post("/searchdata",searchdata)
router.get("/add-user",adduser)
router.post("/submitadduser",submitadduser)
router.get("/logoutadmin",logoutadmin)
module.exports = router