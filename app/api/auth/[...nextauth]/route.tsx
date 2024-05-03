import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email
          }
        });
        if(user && (await bcrypt.compare(credentials!.password, user.password))){
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        }
        else{
          throw new Error("Invalid E-mail or password")
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      if(session.user){
        session.user.id = Number(token.id);
        session.user.name = String(token.name);
        session.user.role = String(token.role);
      }
      return session
    },
    async jwt({ token, user}) {
      if(user){
        token.id = user.id;
        token.name = user.name
        token.role = user.role
      }
      return token
    }
  }
})

export { handler as GET, handler as POST }