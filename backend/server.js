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
        console.error("Ocorreu um erro", error)
        res.status(500).json({success: false, error: "Error saving Book"})
    }
})

app.get("/api/v1/books", async (req, res) =>  {
    try {
        const books = await Book.find();
        res.status(200).json({success: true, data: books})
    } catch (error) {
        console.error("Ocorreu um erro", error)
        res.status(500).json({success: false, error: "Erro ao buscar livro"})
    }
})

app.get("/api/v1/books/:id", async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, error: "Id invalido"})
    }

    try {
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({success: false, error: "Livro não encontrado"})
        } 
        res.status(300).json({success: true, data: book})
    } catch (error) {
        console.error("Error ao procurar o livro", error)
        res.status(500).json({success: false, error: "Error ao encontrar o livro"})
    }
})

app.listen(3000, () => {
    console.log("O servidor esta rodando na porta 3000")
    connectToDataBase()
})

//2JtzJLwMHTVy2EII