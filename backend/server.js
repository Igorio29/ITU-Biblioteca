import "dotenv/config"
import path from "path"
import express from "express"
import mongoose from "mongoose"
import { connectToDataBase } from "./config/db.js"
import { Book } from "./models/book.model.js"
import router from "./routes/book.routes.js"


const app = express()

app.get("/health", (req, res) => {
    try {
        res.status(200).send("Server is running")
    } catch (error) {
        console.log("Server is not running ",error)
        res.status(500).send("Server is not running")
    }
})

const port = process.env.PORT || 3000
const __dirname = path.resolve()

app.use(express.json())

app.use("/api/v1/books", router)

if(process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(port, () => {
    console.log(`O servidor esta rodando na porta ${port}`)
    connectToDataBase()
})

//2JtzJLwMHTVy2EII