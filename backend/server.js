import "dotenv/config"
import express from "express"
import mongoose from "mongoose"

const app = express()

async function connectToDataBase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Banco conectado com sucesso")
    } catch (error) {
        console.log("houve um erro:", error)
        process.exit(1)
    }

}

app.listen(3000, () => {
    console.log("O servidor esta rodando na porta 3000")
    connectToDataBase()
})

//2JtzJLwMHTVy2EII