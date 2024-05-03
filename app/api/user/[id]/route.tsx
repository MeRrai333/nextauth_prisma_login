import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
    req: NextRequest,
    { params } : { params: { id: string } }
){
    const token = await getToken({req})
    if(token?.role != "admin")
        return NextResponse.json({status: 1, message: "only admin"})
    const validPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
    const form = await req.json();
    if(form.passChange){
        if(!validPassword.test(form.password))
            return NextResponse.json({status: 2, message: ""})
        const hashPass = bcrypt.hashSync(form.password, 10)
        try{
            const user = await prisma.user.update({
                where: {
                    id: Number(params.id)
                },
                data: {
                    role: form.role,
                    password: hashPass
                }
            })
            return NextResponse.json({status: (form.role != "admin" && token.id == params.id) ? -2 : -1})
        }
        catch(e){
            console.log(e)
            return NextResponse.json({status: 20, message: "error database"})
        }
    }
    else{
        try{
            const user = await prisma.user.update({
                where: {
                    id: Number(params.id)
                },
                data: {
                    role: form.role
                }
            })
            return NextResponse.json({status: (form.role != "admin" && token.id == params.id) ? -2 : -1})
        }
        catch(e){
            console.log(e)
            return NextResponse.json({status: 20, message: "error database"})
        }
    }
}

export async function DELETE(
    req: NextRequest,
    { params } : { params: {id: string} }
){
    const token = await getToken({req})
    if(token?.role != "admin")
        return NextResponse.json({status: 1, message: "only admin"})
    try{
        const user = await prisma.user.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json({status: -1, user})
    }
    catch(e){
        console.log(e);
        return NextResponse.json({status: 20, message: "error database"})
    }
}