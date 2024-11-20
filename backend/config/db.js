import mongoose from "mongoose";

export async function connectToDataBase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Banco conectado com sucesso")
    } catch (error) {
        console.log("houve um erro:", error)
        process.exit(1)
    }
}
