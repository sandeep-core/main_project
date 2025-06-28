import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import {parse} from 'querystring';
import { join } from 'path';
import url from 'url';
import session from 'express-session';
import { json } from 'stream/consumers';
import isAuthentication from './util/isAuthentication.js';
import home from './routes/home/index.js';
import admin from "./routes/admin/index.js";
import path from 'path';

let user = "";
let posts = [
   
]

dotenv.config();
const app = express()
const PORT = process.env.PORT;
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
app.use("/assets", express.static(join(__dirname, "public")))

app.use(session({
    secret:"a1s2d3f4g5h6"
}))
app.use(urlencoded())
app.use(express.json())

app.set('view engine', 'pug');

// ✅ Correctly set views directory path
app.set('views', path.join(__dirname, 'views'));

app.use("/", home)
app.use("/admin", admin)

app.get("/", (req, res)=> {
    res.status(200).send("<h1>This is Get Method</h1>")
})

app.get("/admin", (req, res)=>{
    req.session.user
        ? res.redirect("/admin/dashboard")
        : res.redirect("/admin/login")
})

app.get("/admin/login", (req, res)=>{
        res.render("login")
    })
    .post("admin/login", (req, res) => {
    const { email, password } = req.body;
  
    if (email === "piyushsir@gmail.com" && password === "team123") {
      req.session.user = email.split("@")[0].toUpperCase();
      return res.redirect("/admin/dashboard");
    } else {
      return res.render("login", { error: "Invalid email or password" });
    }
  });
  

app.get("/admin/dashboard", isAuthentication, (req, res)=>{
    res.render("dashboard", {
        user:req.session.user,
        posts
    })
})

app.get("/admin/logout", (req, res)=>{
    delete req.session.user;
    res.redirect("/admin/login")
})
app.post("/admin/moderate", (req,res)=>{
    res.redirect("/admin/dashboard")
})
app.listen(PORT, ()=> console.log(`Server start ho gaya http://localhost:${PORT}`))