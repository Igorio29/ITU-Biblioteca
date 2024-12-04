import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    subtitulo: {
        type: String,
        require: false
    },
    autor: {
        type: String,
        require: true
    },
    genero: {
        type: String,
        require: true
    },
    capa: {
        type: String,
        require:  true
    },
    link: {
        type: String,
        require:  true
    }
}, {timestamps: true}) // o mesmo model sera usado para criar e atualizar o banco

export const Book = mongoose.model("Book", bookSchema);