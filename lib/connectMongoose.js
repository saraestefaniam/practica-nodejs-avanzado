import mongoose from "mongoose";

/*
export default function connectMongoose() {
    return mongoose.connect('mongodb://localhost/NodePopDB')
        .then(mongoose => mongoose.connection)
}*/

export default function connectMongoose() {
    console.log("Intentando conectar a MongoDB...");
    
    return mongoose.connect(process.env.MONGODB_CONNSTR)
        .then(() => {
            console.log("Conectado a MongoDB");
            return mongoose.connection;
        })
        .catch(error => {
            console.error("Error al conectar a MongoDB:", error);
            process.exit(1); // Detiene la ejecución si hay un error
        });
}
