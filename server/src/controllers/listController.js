const { listModel } = require("../models");

const getLists = async(_req, res) => {

    try {
        const data = await listModel.find()
        res.send({message:"success", data})        
    } catch (error) {
        res.status(500)
        res.json({error})
    }

}
const getListById = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await listModel.findById(id)
        res.send({message:"success", data})        
    } catch (error) {
        res.status(500)
        res.json({error})
    }
}
const createList = async(req, res) => {
    const { body } = req;
    // console.log(body)
    try{
        const data = await listModel.create(body)
        res.json({msg: "success", data})
    }catch(error){
        res.status(500)
        res.json(error)
    }
}
const updateList = async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    // console.log(body)

    try{
        await listModel.findOneAndUpdate({_id: id}, body)
        res.json({msg: "success", data: body})
    }catch(error){
        res.status(500)
        res.json(error)
    }
}
const deleteList = async(req, res) => {
    try {
        const { id } = req.params;
        await listModel.findOneAndDelete({_id: id})
        res.send({message:"success"})        
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

module.exports = { 
    getLists,
    getListById, 
    createList, 
    updateList, 
    deleteList 
}