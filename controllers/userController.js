const db = require("../models/server")
const bcrypt = require('bcrypt')

let product = [{
    img: "/user/1.jpg",
    price: "$34",
    description: "PTron Tangentbeat "
},
{
    img: "/user/2.jpg",
    price: "$87",
    description: " Enhanced Bass, 10mm Drivers",
},
{
    img: "/user/3.jpg",
    price: "$56",
    description: " Enhanced Bass",
},
{
    img: "/user/4.jpg",
    price: "$23",
    description: " 10mm Drivers",
},
{
    img:"/user/5.jpg",
    price: "$45",
    description: " Clear Calls",
},
{
    img: "/user/6.jpg",
    price: "$59",
    description: " Snug-Fit, Fast Charging",
}]


module.exports = {
    userHome: (req, res) => {
        res.render("login",{message:false})
    },
    signup: (req, res) => {
        res.render("signup")
    },
    home: (req, res) => {
       if(req.session.user){
        res.render("home",{product})
       }else{
        res.render("login",{message:false})
       }
    },
    postSignup: async (req, res) => {
        console.log(req.body);
        let name = req.body.username
        let email = req.body.useremail
        let userpassword = await bcrypt.hash(req.body.password, 10)
        let confirmpassword = await bcrypt.hash(req.body.confirmPassword, 10)

        console.log("registration completed")

        let data = {
            "name": name,
            "email": email,
            "password": userpassword,
            "confirmpassword": confirmpassword

        }
        db.get().collection("userdetail").insertOne(data)
        if (data) {
            req.session.user = true;
            res.redirect("/")
        } else {
            res.redirect("/signup")
        }
    },
    postLogin: async (req, res) => {
        console.log(req.body);
        console.log(1111111111111111111111);
        const { email, password } = req.body

        console.log(password)
        
        
        let user = await db.get().collection("userdetail").findOne({email:email})

        console.log("hai" + user);
        if (user) {

            console.log(" user finded",user )

           await bcrypt.compare(password, user.password,(err, data) => {
                if (err) {
                    console.log(err);
                }
                else if (data == true) {
                    console.log("user login successfull");
                    req.session.user = true;
                    res.redirect("/home")
                }
                else {
                    
                    console.log("wrong password");
                   
                    res.render("login",{message:"Wrong password"})
                }
            })


        }
        else{
           
            console.log("wrong password");
            res.render("login",{message:"Wrong email"})
        }
    },
    userLogout:(req,res)=>{
        res.redirect("/")
    },
    userLogout:(req,res)=>{
       
        req.session.destroy();
        res.redirect("/")   
    }
}

