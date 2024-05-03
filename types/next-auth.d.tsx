import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: String,
      email: String,
      id: Number,
      role: String
    },
    expires: Date
  }
  interface User {
    user: {
      name: String,
      email: String,
      id: Number,
      role: String
    },
    expires: Date
  }
}