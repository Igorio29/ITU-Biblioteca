import { Router } from "express";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/book.controller.js";
import { validateBook } from "../middleware/book.validate.js";

const router = Router()

router.get("/", getBooks)

router.get("/:id", getBook)

router.post("/", validateBook, createBook)

router.put("/:id",validateBook, updateBook)

router.delete("/:id", deleteBook)

export default router;