const { objectid, ObjectId } = require('mongodb')
const db = require("../models/server")
const bcrypt = require('bcrypt')

const adminLogin = (req, res) => {

    res.render("adminLogin")

}
const adminHome = (req, res) => {
    if(req.session.admin){
    res.render("adminHome")
    }
    else{
        res.render("adminLogin")
    }
}
const finduser = async (req, res) => {
    console.log(".................")
     if(req.session.admin){
    const userdetails = await db.get().collection("userdetail").find().toArray()
    console.log(userdetails);
    
    res.render("userlist", { userdetails })
}
else{
    res.render("adminLogin") 
}

}
const edituser = async (req, res) => {
    const ID = req.params.id
    console.log(ID);
    const userdetails = await db.get().collection("userdetail").findOne({ _id: ObjectId(ID) })
    console.log(userdetails);
    res.render("edit", { userdetails })
}
const editsubmit = async (req, res) => {
    const editID = req.params.id
    const editname = req.body.updatename
    const editemail = req.body.email
    console.log("hiiiiiiiiiiiii");
    console.log(editname);
    console.log(editID);
    await db.get().collection("userdetail").updateOne(
        {
            _id: ObjectId(editID)
        }, {
        $set: {
            name: editname,
            email: editemail
        }
    }
    )
    res.redirect("/admin/finduser")

}
const deleteuser = async (req, res) => {
    const dltid = req.params.id
    console.log(dltid);
    await db.get().collection("userdetail").deleteOne({ _id: ObjectId(dltid) })
    res.redirect("/admin/finduser")

}
const searchdata = async (req, res) => {
    console.log("i");
    console.log(req.body.searchdata);

    const regexp = new RegExp(req.body.searchdata, "i")
    const searcheduser = await db.get().collection("userdetail").find({
        $or: [
            {
                name: { $regex: regexp }
            },
            {

                email: { $regex: regexp }
            }

        ]
    }).toArray()
    console.log("search success");
    res.render("searchdata", { searcheduser })


}
const adduser = (req, res) => {
    res.render("adduser")
}
const submitadduser = async (req, res) => {
    console.log(req.body);
    let name = req.body.name
    let email = req.body.email
    let userpassword = await bcrypt.hash(req.body.password, 10)
    console.log("registration success");

    let data = {
        "name": name,
        "email": email,
        "password": userpassword

    }
    db.get().collection("userdetail").insertOne(data)
    if (data) {
        res.redirect("/admin/finduser")
    }
    else {
        console.log("adduser......");
        res.redirect("/admin/add-user")
    }

}


const adminMail = "munavirokv@gmail.com"
const adminPassword = 123456
const adminPostLogin = (req, res) => {
    console.log(req.body);
    const email = req.body.email
    const password = req.body.password
    if (adminMail == email && adminPassword == password) {
        console.log("admin login success");
        req.session.admin=true
        res.render("adminHome")
    }
    else {

        res.redirect("/admin")
    }

}

const logoutadmin=(req,res)=>{
    req.session.destroy()
    res.redirect("/admin")
}


module.exports = {
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
    logoutadmin
}