import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    eDeficiente: {
        type: String,
        required: true,
    },
    respostaPrimaria: {
        type: String,
        required: true,
    },
});

const Form = mongoose.model("Form", formSchema);

export default Form;