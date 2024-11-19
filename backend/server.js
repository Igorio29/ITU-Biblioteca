import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import { connectToDataBase } from "./db/connect.js"
import { Book } from "./models/book.model.js"

const app = express()

app.use(express.json())

app.post("/api/v1/books", async (req, res) => {
    const { titulo, subtitulo, autor, genero, capa } = req.body;

    try {
        const book = new Book({ titulo, subtitulo, autor, genero, capa })
        await book.save()
        res.status(201).json({success: true, data: book})
    } catch (error) {
        console.log("Ocorreu um erro", error)
        res.status(500).json({success: false, error: "Error saving Book"})
    }
})

app.listen(3000, () => {
    console.log("O servidor esta rodando na porta 3000")
    connectToDataBase()
})

//2JtzJLwMHTVy2EII