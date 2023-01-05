import express from "express";
import cors from "cors";
import mongo from './mongo';
import routes from "./routes"

mongo.connect();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

if(process.env.NODE_ENV === "production")
{
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function(req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { 
    console.log(`Server listening on port ${PORT}`)
});