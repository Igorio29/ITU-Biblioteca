import mongoose from "mongoose";
import { Book } from "../models/book.model.js";

export const getBooks = async (req, res) =>  {
    try {       
        const books = await Book.find();
        res.status(200).json({success: true, data: books})
    } catch (error) {
        console.error("Ocorreu um erro", error)
        res.status(500).json({success: false, error: "Erro ao buscar livro"})
    }
}

export const getBook = async(req, res) => {
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
}

export const createBook = async (req, res) => {
    const { titulo, subtitulo, autor, genero, capa, link } = req.body;

    try {
        const book = new Book({ titulo, subtitulo, autor, genero, capa, link })
        await book.save()
        res.status(201).json({success: true, data: book})
    } catch (error) {
        console.error("Ocorreu um erro", error)
        res.status(500).json({success: false, error: "Error saving Book"})
    }
}

export const updateBook = async (req, res) => {
    const {id} = req.params
    const {titulo, subtitulo, autor, genero, capa, link} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, error: "Id invalido"})
    }
    try {
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({success: false, error: "Livro não encontrado"})
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {titulo, subtitulo, autor, genero, capa, link},
            {new: true}
        )

        await book.save()
        res.status(200).json({success: true, data: updatedBook })
    } catch (error) {
        console.error("Ocorreu um erro")
        res.status(500).json({success: false, error: "Ocorreu um erro", error})
    }
}

export const deleteBook = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({success: false, error: "Id invalido"})
    }
    try {
        const book = await Book.findById(id)
        if(!book){
            res.status(404).json({success: false, error: "Livro não encontrado"})
        }

        await Book.findByIdAndDelete(id)
        res.status(200).json({success: true, data: {}})

    } catch (error) {
        console.error("Ocorreu um erro")
        res.status(500).json({success: false, error: "Ocorreu um erro ao deletar o livro", error})
    }
}