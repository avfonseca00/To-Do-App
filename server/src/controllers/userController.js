const { userModel } = require("../models");

const getUsers = async(_req, res) => {

    try {
        const data = await userModel.find()
        res.send({message:"success", data})        
    } catch (error) {
        res.status(500)
        res.json({error})
    }

}
const getUserById = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await userModel.findById(id)
        res.send({message:"success", data})        
    } catch (error) {
        res.status(500)
        res.json({error})
    }
}
const createUser = async(req, res) => {
    const { body } = req;
    // console.log(body)
    try{
        const data = await userModel.create(body)
        res.json({msg: "success", data})
    }catch(error){
        res.status(500)
        res.json(error)
    }
}
const updateUser = async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    // console.log(body)

    try{
        await userModel.findOneAndUpdate({_id: id}, body)
        res.json({msg: "success", data: body})
    }catch(error){
        res.status(500)
        res.json(error)
    }
}
const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;
        await userModel.findOneAndDelete({_id: id})
        res.send({message:"success"})        
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

module.exports = { 
    getUsers,
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
}