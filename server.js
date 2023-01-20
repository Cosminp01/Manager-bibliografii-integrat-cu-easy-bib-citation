const express = require('express');
const sequelize = require('./database');
const cors = require('cors');
const { urlencoded } = require('express');
const Bibliografie = require('./models/bibliografie.model.js');

sequelize.sync().then(() => console.log('db is ready'));

const app = express();
app.use(express.json());

app.post('/bibliografie', (req, res) =>{
   
    try     
    {
        Bibliografie.create(req.body).then(() => {
            res.send('Bibliografia a fost adaugata');
        });
    }
    catch (e ){
        console.error(e);
    }
    
});

app.get('/bibliografie/:id', async (req, res) => {
    //const bibliografie = await Bibliografie.findAll();
    const requestedId = req.params.id;
    const bibliografie = await Bibliografie.findOne({ where: {id: requestedId}});
    res.send(bibliografie);
});

app.put('/bibliografie/:id' , async(req, res) => {
    const requestedId = req.params.id;
    const bibliografie = await Bibliografie.findOne({ where: {id: requestedId}});
    bibliografie.Author = req.body.Author;
    bibliografie.Book = req.body.Book;
    bibliografie.DateOfPublishing = req.body.DateOfPublishing;
    bibliografie.Price = req.body.Price;
    await bibliografie.save();
    res.send('The bibliografy was update');
});

app.delete('/bibliografie/:id' , async (req,res) =>{
    const requestedId = req.params.id;
    const bibliografie = await Bibliografie.destroy({ where: {id: requestedId}});
    if(!bibliografie) res.status(404).send('The course id is not found');
    res.send('The bibliografy was delete.');
});

app.post('/bibliografie1', (req, res) =>{
   
    try     
    {
        Bibliografie.create(req.body).then(() => {
            res.send('Bibliografia a fost adaugata');
        });
    }
    catch (e ){
        console.error(e);
    }
    
});


var corsOptions = {origin: "http://localhost:3500"}; // URL pentru frontend

app.use(cors(corsOptions));
app.use(express.json()); // activarea parsare a obiectelor din JSON
app.use(express.urlencoded({ extended: true })); //parsing app
//const db = require("./index.js");
//db.sequelize.sync();

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}..`);
});

