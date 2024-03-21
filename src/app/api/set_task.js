import { connectMongoDB } from "../functions/mongoConnect"

export default function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ msg: "Só POST" })
        return 
    }

const {form} = req.body

try{
    await connectMongoDB()
    Form.create({form}).then((data) => {
        console.log(form);
        res.status(201).send(data);
    })
} catch(err) {
    console.log(err)
    res.status(400).send({ err, msg: "Ih, que tistreza" })
}
}