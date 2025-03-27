const { isValidObjectId } = require("mongoose");
const { taskModel } = require("../models");

const getTasks = async(_req, res) => {

    try {
        const data = await taskModel.find()
        res.send(data)        
    } catch (error) {
        res.status(500)
        res.json({error})
    }

}
const getTaskById = async(req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) { 
            return res.status(400).json({ error: 'ID is invalid' });  
        }  

        const data = await taskModel.findById(id)

        if (!data) {  
            return res.status(404).json({ error: 'Task not found' });  
        }

        res.send(data)        
    } catch (error) {
        console.error('Error getting task:', error);  
        res.status(500).json({ error: 'Server error' });
    }
}
const getUserTasks = async(req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const data = await taskModel.find({userId}).skip((page - 1) * limit).limit(limit)
        const totalItems = await taskModel.countDocuments({userId})
        const totalPages = Math.ceil(totalItems / limit)

        res.json({  
            data,  
            pagination: {  
                page: Number(page),  
                limit: Number(limit),  
                totalPages,  
                totalItems  
            }  
        });        
    } catch (error) {
        res.status(500)
        res.json({error})
    }
}
const searchTask = async(req, res) => {
    try {  
        const { search, status, date, page = '1', pageSize = 10 } = req.query; 
        const {userId} = req.params
        const parsedPage = parseInt(page)
        let gteDate = null, lteDate = null
        console.log('req.query', req.query) 

        // Construye la query base  
        let query = taskModel.find({userId});  

        // Aplica el término de búsqueda (search)  
        if (search) {  
            const regex = new RegExp(search, 'i'); // Búsqueda insensible a mayúsculas  
            query = query.or([  
                { title: regex },  
                { description: regex },  
                // Añade más campos que quieras incluir en la búsqueda  
            ]);  
        }  

        // Aplica los filtros  
        if (status&&(status!=='')) {  
            query = query.where('status').equals(status);  
        }  
        // Función para manejar fechas  
        const handleDateFilter = (dateStr) => {  
            // Verifica si es un rango de fechas (formato: start_date,end_date)  
            if (dateStr.includes(',')) {  
                const [startDate, endDate] = dateStr.split(',');  
                if (startDate && endDate) { 
                    gteDate = new Date(startDate)
                    lteDate = new Date(endDate)
                    return {  
                        gte: gteDate,  
                        lte: lteDate  
                    };  
                }  
            }  
            // Si es una sola fecha  
            if (dateStr) {  
                const date = new Date(dateStr);  
                if (!isNaN(date.getTime())) {    

                    const start = new Date(date);  
                    const end = new Date(date);  
    
                    start.setHours(0, 0, 0, 0);   // Hora de inicio: 00:00:00  
                    end.setHours(23, 59, 59, 999); // Hora de fin: 23:59:59.999  
                    gteDate = start
                    lteDate = end
                    return {  
                        st: start,
                        en: end
                    };  
                }
            }  
            return null;  
        };  

        // Aplica el filtro por fecha  
        if (date) {  
            const dateFilter = handleDateFilter(date);  
            if (dateFilter) {  
                if (dateFilter.gte && dateFilter.lte) {  
                    // Rango de fechas  
                    query = query.where('createdAt').gte(dateFilter.gte).lte(dateFilter.lte);  
                } else if (dateFilter.st && dateFilter.en) {  
                    // Fecha específica  
                    query = query.where('createdAt').gte(dateFilter.st).lte(dateFilter.en);
                }  
            }  
        }  

        // Aplica paginación  
        const skip = (parsedPage - 1) * pageSize;  
        query = query.skip(skip).limit(pageSize);  

        // Ejecuta la query  
        const resultados = await query.exec();

        res.json({ 
            data: resultados, 
            page: parsedPage, 
            pageSize: Number(pageSize),  
            total: resultados.length
        });  
    } catch (error) {  
        console.error('Error en la búsqueda:', error);  
        res.status(500).json({ message: 'Error al realizar la búsqueda' });  
    }
}

const createTask = async(req, res) => {
    const { body } = req;
    // console.log(body)
    try{
        const data = await taskModel.create(body)
        res.json({msg: "success", data})
    }catch(error){
        res.status(500)
        res.json(error)
    }
}
const updateTask = async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    // console.log(body)

    try{
        await taskModel.findOneAndUpdate({_id: id}, body)
        res.json({msg: "success", data: body})
    }catch(error){
        res.status(500)
        res.json(error)
    }
}
const deleteTask = async(req, res) => {
    try {
        const { id } = req.params;
        await taskModel.findOneAndDelete({_id: id})
        res.send({message:"success"})        
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

module.exports = { 
    getTasks,
    getTaskById, 
    getUserTasks,
    searchTask,
    createTask, 
    updateTask, 
    deleteTask 
}