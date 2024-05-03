import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request){
    const validUsername = /^[0-9A-Za-z]{6,16}$/;
    const validPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
    const form = await req.json();
    if(!validUsername.test(form.name))
        return Response.json({signin: 1})
    if(!validPassword.test(form.password))
        return Response.json({signin: 2})
    if(form.password != form.confpassword)
        return Response.json({signin: 3})
    const passwordHash = bcrypt.hashSync(form.password, 10);

    try{
        const user = await prisma.user.create({
            data: {
                email: form.email,
                name: form.name,
                password: passwordHash,
                role: "member"
            }
        })
        console.log(user)
        return Response.json(user)
    }
    catch(e){
        console.log(e.meta.target[0])
        if(e.meta.target[0] == "email")
            return Response.json({signin: 30})
        else if(e.meta.target[0] == "name")
            return Response.json({signin: 40})
        return Response.json({signin: 4})
    }

    return Response.json({form, hash: passwordHash})
}