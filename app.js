import express from "express";
import dotenv from "dotenv";
import conn from './db.js';
import cookie_parser from 'cookie-parser';
import page_route from './routes/page_route.js';
import photo_route from './routes/photo_route.js';
import user_route from './routes/user_route.js';
import { checkUser } from './middlewares/auth_middleware.js'

dotenv.config();

//connection to db
conn();

const app = express();
const port = process.env.PORT;

//ejs template engine
app.set('view engine', 'ejs');

//static files middleware
app.use(express.static('public'));
app.use(express.json()); // girilen değerlerde json çıktı verilmesi için kullanılan middleware.
app.use(express.urlencoded({ extended: true })); // alınan verilerin post işlemi ile db'ye aktarılması için kullanılan middleware.
app.use(cookie_parser());

//routes
app.get("*", checkUser); // tüm get komutlarında bunu uygula.. kullanıcı login olmuş mu?
app.use('/', page_route);
app.use('/photos', photo_route);
app.use('/users', user_route);

app.listen(port, () => {
    console.log("Application listening on port: " + port);
});

