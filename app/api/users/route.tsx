import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const revalidate = 0;

export async function GET(req: NextRequest){
    const token = await getToken({req})
    if(token?.role != "admin")
        return NextResponse.json({
            status: 1,
            message: "only admin"
        })
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true
        },
        orderBy: {
            createAt: 'asc'
        }
    });
    return NextResponse.json(users)
}