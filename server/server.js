const bodyParser = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();  
const PORT = 8090

// const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URL

//Mongo Connection

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});


const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
});

const ToDo = mongoose.model('ToDo', todoSchema);

app.use(bodyParser.json());


//Routes

app.get('/test/todos', async(req, res) => {
    try {
        const todos = await ToDo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post('/test/todos', async(req, res) => {
    try {
        const { task } = req.body;
        const newTodo = new ToDo({ task });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.delete('/test/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await ToDo.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

app.listen(PORT, () => {
    console.log(`Server is listenin to port: ${PORT}`)
});
