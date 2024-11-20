import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import { connectToDataBase } from "./config/db.js"
import { Book } from "./models/book.model.js"
import router from "./routes/book.routes.js"

const app = express()

app.use(express.json())

app.use("/api/v1/books", router)

app.listen(3000, () => {
    console.log("O servidor esta rodando na porta 3000")
    connectToDataBase()
})

//2JtzJLwMHTVy2EII