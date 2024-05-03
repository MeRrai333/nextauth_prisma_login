'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Page(){
    const route = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: form.get("email"),
                password: form.get("password"),
                confpassword: form.get("confpassword"),
                name: form.get("name")
            })
        });
        const data = await res.json();
        if(data.signin){
            if(data.signin == 1)
                alert("Username can use only a-z, A-Z, number and lenght between 6 to 16!")
            else if(data.signin == 2)
                alert("Password should contain at least 1 uppercase, 1 lowwercase, 1 special character 1 number and length between 8 - 32")
            else if(data.signin == 3)
                alert("password isn't correct!")
            else if(data.signin == 30)
                alert("E-mail is used!")
            else if(data.signin == 40)
                alert("Username is used!")
            return;
        }
        route.push("/auth/signin")
    }

    return(
        <main className="h-screen w-screen flex justify-center items-center">
            <form className="flex flex-col w-fit jusstify-center bg-slate-800 p-4 rounded-lg gap-2" onSubmit={handleSubmit}>
                <label className="text-xl text-center font-bold">SIGN UP</label>
                <label>Username</label>
                <input className="text-black" type="text" name="name"/>
                <label>E-mail</label>
                <input className="text-black" type="email" name="email"/>
                <label>password</label>
                <input className="text-black" type="password" name="password"/>
                <label>confirm password</label>
                <input className="text-black" type="password" name="confpassword"/>
                <div className="flex flex-row justify-between items-center mt-4">
                    <Link href="/auth/signin">
                        <svg className="h-6 w-6 text-white hover:text-slate-400 duration-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                    </Link>
                    <input className="duration-500 hover:bg-slate-900 w-fit p-2 rounded-lg cursor-pointer" type="submit" value="Sign up"/>
                </div>
            </form>
        </main>
    )
}