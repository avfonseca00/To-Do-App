const { userModel } = require("../models");
const { encrypt, compare } = require("../utils/encryption");
const { signToken } = require("../utils/jwt");

const register = async(req, res) => {

    try {
        const { body } = req;
        const encryptedPassword = await encrypt(body.password);
        const userData = {...body, password: encryptedPassword};
        const emailExists = await userModel.findOne({email: body.email})
        
        if(emailExists){
            res.status(400)
            throw new Error('This email already exixts')
        }

        const data = await userModel.create(userData);
        data.set("password", undefined, {strict: false});

        const token = await signToken(data);
        
        res.send({status: 'success', message:"User successfully registered", token, data});

    } catch (error) {
        res.json({status: 'error', message:error.message});
    }

}

const login = async(req, res) => {
    try{
        const { body } = req;
        const user = await userModel.findOne({email:body.email});

        if(!user){
            res.status(404);
            throw new Error('User not found')
        }

        const encryptedPassword = user.password;
        const valid = await compare(body.password, encryptedPassword)

        if(!valid){
            res.status(401);
            throw new Error("The password provided is invalid")
        }

        const data = {
            token: await signToken(user),
            user
        }

        res.json({message: "Login success", data})
    }catch(error){
        res.json({status: 'error', message:error.message});
    }
}

module.exports = { register, login }