const { find } = require("../models/userModel");
const User = require("../models/userModel")
module.exports.signup = async (req, res, next) => {
    try {
        const {username,email,password} = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "This Username already exist", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false });
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        const ss = await User.create({
            username,
            email,
            password
        })
        const userobj = ss;
        userobj.password = null;
        return res.json({ status: true, userobj });
    } catch (ex) {
        next(ex)
    }

}

module.exports.login = async (req,res,next)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.json({status:false,msg:"Incorrect Username Or Password"});
        }
        const isPasswordValid = await User.findOne({password});
        if(!isPasswordValid){
            return res.json({status :false, msg:"Incorrect Username or Password"});
        }
        const userobj = user;
        userobj.password = null;
        console.log(userobj)
        return res.json({status:true, userobj})
    }catch(ex){
        next(ex);
    }
}