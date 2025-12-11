import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_API_K}`, 
        {
            dbName: 'MedifyEvents',
        }
        );
        console.log("******************* Conectado a Base de datos: MedifyEvents *******************")
    } catch (error) {
        console.log(error);
    }
}