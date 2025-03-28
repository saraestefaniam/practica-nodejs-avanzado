import mongoose from "mongoose";

export default function connectMongoose() {
    return mongoose.connect('mongodb://localhost/NodePopDB')
        .then(mongoose => mongoose.connection)
}