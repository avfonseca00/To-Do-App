const { workspaceModel } = require("../models");

const getWorkspaces = async(_req, res) => {

    try {
        const data = await workspaceModel.find({userId:"67ba1bc2182332a056a0bbf2"})
        res.send({message:"success", data})        
    } catch (error) {
        res.status(500)
        res.json({error})
    }

}
const getWorkspaceById = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await workspaceModel.findById(id)
        res.send({message:"success", data})        
    } catch (error) {
        res.status(500)
        res.json({error})
    }
}
const createWorkspace = async(req, res) => {
    const { body } = req;
    // console.log(body)
    try{
        const data = await workspaceModel.create(body)
        res.json({msg: "success", data})
    }catch(error){
        res.status(500)
        res.json(error)
    }
}
const updateWorkspace = async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    // console.log(body)

    try{
        await workspaceModel.findOneAndUpdate({_id: id}, body)
        res.json({msg: "success", data: body})
    }catch(error){
        res.status(500)
        res.json(error)
    }
}
const deleteWorkspace = async(req, res) => {
    try {
        const { id } = req.params;
        await workspaceModel.findOneAndDelete({_id: id})
        res.send({message:"success"})        
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

module.exports = { 
    getWorkspaces,
    getWorkspaceById, 
    createWorkspace, 
    updateWorkspace, 
    deleteWorkspace 
}