import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "lenslight_db",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("connected to db successfully");
    }).catch(err => console.log("error connecting: " + err));
};

export default conn;