'use client'

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page(){
    const [signinError, setSigninError] = useState<string>("")
    const route = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        try{
            const user = await signIn("credentials", {
                email: form.get("email"),
                password: form.get("password"),
                redirect: false,
            })
            console.log(user)
            if(user?.status == 401)
                setSigninError("Invalid E-mail or password")
            else if(user?.status == 200)
                route.push("/profile")
        }
        catch(e){
            console.log("error:",e)
        }
    }

    return(
        <main className="h-screen w-screen flex justify-center items-center">
            <form className="flex flex-col w-fit jusstify-center bg-slate-800 p-4 rounded-lg gap-2" onSubmit={handleSubmit}>
                <label className="text-xl text-center font-bold">SIGN IN</label>
                <label>E-mail</label>
                <input className="text-black" name="email" type="email"/>
                <label>password</label>
                <input className="text-black" name="password" type="password"/>
                <div className="text-red-700 text-xs">{signinError}</div>
                <Link href="/auth/signup" className="underline hover:text-slate-400 duration-500">Sign up</Link>
                <div className="flex justify-center">
                    <input className="mt-4 duration-500 hover:bg-slate-900 w-fit p-2 rounded-lg cursor-pointer" type="submit" value="Sign in"/>
                </div>
            </form>
        </main>
    )
}