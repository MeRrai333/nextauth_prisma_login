'use client'

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page(){
    const { data: session, status } = useSession();
    const router = useRouter();

    if(status == "authenticated" && session.user)
        return(
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="flex flex-col gap-4 bg-slate-800 w-fit p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-center">Profile</h3>
                    <table className="border-separate border-spacing-4">
                        <tbody>
                            <tr>
                                <td className="font-bold">Username</td>
                                <td>{session.user.name}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">E-mail</td>
                                <td>{session.user.email}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Role</td>
                                <td>{session.user.role}</td>
                            </tr>
                        </tbody>
                    </table>
                    {
                        session.user.role == "admin" ? 
                        <div className="flex justify-center">
                            <Link href="/admin" className="cursor-pointer hover:text-slate-300 duration-500 w-fit p-2 underline rounded-lg">
                                Admin
                            </Link>
                        </div>
                        : <></>
                    }
                    <div className="flex justify-center">
                        <button className="p-2 duration-500 hover:bg-slate-900 rounded-lg" onClick={() => signOut({ callbackUrl: "/auth/signin" })} >Sing out</button>
                    </div>
                </div>
               
            </div>
        )
    router.push("/auth/signin")
}