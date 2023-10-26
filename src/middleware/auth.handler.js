const User = require("../models/users/usersModels")
const bcrypt = require("bcrypt")
const passport = require("passport")


function protect(){
    return passport.authenticate('jwt', {session:false})
}

function checkRoles(...roles){
    return(req, res, next)=>{
        const user = req.user
        if(roles.includes(user.role) && user.state === "active"){
            next()
        }else{
            next(res.status(403).json({message: "No esta autorizado para acceder a este recurso"}))
        }
    }
}

async function checkPassword(email, oldPassword){
    
    const user = await User.findOne({email})
    const compararPassword=await bcrypt.compare(oldPassword, user.password)
    if(user && compararPassword){
        return
    }else{
        res.status(400).json({message:"La contraseña no coinciden"})
    }
}

function checkApiKey (req, res, next) {
    const apikey = req.headers.api
    if (apikey === process.env.APIKEY) {
      next()
    } else {
      next(res.status(403).json({message:"Wrong api key"}))
    }
}
module.exports ={checkRoles, checkPassword, protect, checkApiKey}