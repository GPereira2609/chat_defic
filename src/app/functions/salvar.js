
export default function salvar(nome, isDeficiente, respostaPrimaria) {
    const mongoose = require('mongoose');

    main().catch(err => console.log(err));

    async function main() {
        mongoose.createConnection('mongodb://127.0.0.1:27017/deficiente');

        const Form = mongoose.model("Form", { nome: String, eDeficiente: String, respostaPrimario: String })

        const eDeficiente = isDeficiente==="1" ? "Pessoa com deficiência" : "Acompanhante de pessoa com deficiência";
        let respostaPrim;
        if(respostaPrimaria==="1"){
            respostaPrim = "Informações Gerais";
        } else if(respostaPrimaria==="2"){
            respostaPrim = "Acessibilidade";
        } else if(respostaPrimaria==="3"){
            respostaPrim = "Legislação";
        } else if(respostaPrimaria==="4"){
            respostaPrim = "Denúncias e Sugestões";
        }

        const form = new Form({ nome: nome, eDeficiente: eDeficiente, respostaPrimario: respostaPrim })
        form.save.then(() => console.log(form))

        console.log(await Form.find())
    }
    
};