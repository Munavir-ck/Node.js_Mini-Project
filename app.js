const express = require("express")
const app = express()

const userRouter = require("./router/user")
const adminRouter = require("./router/admin")
const ejs = require("ejs")
const expressLayouts = require("express-ejs-layouts")
const db = require("./models/server")
const session=require("express-session")
const logger=require("morgan")
const path = require('path')
const nocache = require("nocache");


app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
// app.set("layout", "layouts/layout")

app.use(session({
    secret:"sessionKey",
    resave : false,
    saveUninitialized:true,
    cookie:{maxAge:6000000}
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));  
app.use(expressLayouts)
app.use(nocache());


// app.use(express.static("public"))
app.use(logger('dev'))

app.use("/", userRouter)
app.use("/admin", adminRouter)

app.listen(3000, () => {
    console.log("server started")
})
db.connect((err) => {
    if (err) {
        console.log("error occured " + err)
    }
    else {
        console.log("data base connected successfully")
    }
})


