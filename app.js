import express from "express";
import dotenv from "dotenv";
import conn from './db.js';
import page_route from './routes/page_route.js';
import photo_route from './routes/photo_route.js';

dotenv.config();

//connection to db
conn();

const app = express();
const port = process.env.PORT;

//ejs template engine
app.set('view engine', 'ejs');

//static files middleware
app.use(express.static('public'));

//routes
app.use('/', page_route);
app.use('/photos', photo_route);

app.listen(port, () => {
    console.log("Application listening on port: " + port);
});

