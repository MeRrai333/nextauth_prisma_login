import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

const seeding = async () => {
    try{
        const passwordHash = bcrypt.hashSync("@Password1", 10);
        const admin = await prisma.user.create({
            data: {
                email: "admin@mail.com",
                name: "adminuser",
                password: passwordHash,
                role: "admin"
            }
        })
        console.log(admin)
    }
    catch(e){
        console.log(e)
    }
}

seeding();