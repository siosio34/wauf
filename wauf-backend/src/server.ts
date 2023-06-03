import express from "express";
import routes from "./routes";

const port = 3001;
const app = express();

app.set("port", port);

app.get("/ping", (req, res, next) => {
    res.send("ok");
    next();
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
})

routes(app); 
  
app.use((error, req, res, next) => {
    res.status(500).json({
        message: "Internal Server Error",
        detail: error.message,
    });
});