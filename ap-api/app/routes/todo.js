var express = require('express');
var router = express.Router();
const db = require("../lib/db");

//ROUTES
//create todo
router.post("/", async (req,res)=>{
    try{
        const {description} = req.body;
        const newTodo = await db.Todo.create({description:description});
        res.json(newTodo);
    }catch(err){
        console.error(err.message);
    }
});
//get all todo
router.get("/", async (req,res)=>{
    try{
        const todos = await db.Todo.findAll();

        res.json(todos);
    }catch(err){
        console.error(err.message);
    }
});
//get single todo
router.get("/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const todo = await db.Todo.findOne({where:{id:id}});
        res.json(todo);
    }catch(err){
        console.error(err.message);
    }
});
//update todo
router.put("/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const todo = await db.Todo.update({description: description},{where:{id:id}} )
        res.json("todo was updated");
    }catch(err){
        console.error(err.message);
    }
});
//delete todo
router.delete("/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const todo = await db.Todo.destroy({where:{id:id}});
        res.json("todo was deleted");
    }catch(err){
        console.error(err.message);
    }
});


module.exports = router;