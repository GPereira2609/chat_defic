import { connectMongoDB } from "@/app/functions/mongoConnect";
import Form from "@/app/models/FormModel";
import { NextResponse } from "next/server";

export async function POST(name, isDeficiente, primaryOption){
    const form = {"nome": name, "eDeficiente": isDeficiente, respostaPrimaria: primaryOption}
    try{
        await connectMongoDB();
        Form.create({form}).then((data) => {
            console.log(form);
            return NextResponse.json({
                "status": "201 CREATED",
            })
        })
    } catch(err) {
        console.log(err);
        return NextResponse.json({
            "status": "400 ALGUMA COISA",
        })
    }
}