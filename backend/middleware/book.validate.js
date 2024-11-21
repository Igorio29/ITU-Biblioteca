import { z } from "zod";

export const bookSchema = z.object({
    titulo: z.string().min(3).max(100),
    subtitulo: z.string().optional(),
    autor: z.string().min(3).max(100).optional(),
    genero: z.string().min(3).max(50),
    capa: z.string().url(),
})

export const validateBook = async (req, res, next) => {
    try {
        bookSchema.parse(req.body)
        next()
    } catch (error) {
        res.status(400).json({success: false, error: error.errors})
    }
}