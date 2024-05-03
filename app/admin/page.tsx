'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react"

type User = {
    id: Number,
    email: string,
    name: string,
    role: string
}

export default function Page(){
    const {data: session, status} = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const roles = [
        {id: 1, role: "member"},
        {id: 2, role: "admin"}
    ]

    const load = () => {
        fetch('/api/users').then(res => res.json()).then(data => setUsers(data));
    }

    useEffect(() => {
        load();
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: Number) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        console.log(`/api/user/${id}`)
        const res = await fetch(`/api/user/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                role: (roles.find(r => r.id == Number(formData.get("role"))))?.role,
                passChange: !(formData.get("password") == ""),
                password: formData.get("password")
            })
        })
        const user = await res.json();
        if(user.status){
            if(user.status == 2)
                alert("Password should contain at least 1 uppercase, 1 lowwercase, 1 special character 1 number and length between 8 - 32")
            else if(user.status == 20)
                alert("Error database")
            else if(user.status == -1)
                window.location.reload();
            else if(user.status == -2)
                signOut();
        }
    }

    const clickDelete = async (id: string) => {
        if(Number(id) == session?.user.id){
            alert("Can't delete yourself");
            return;
        }
        if(confirm("Are you sure?")){
            const res = await fetch(`/api/user/${id}`, {
                method: "DELETE"
            })
            const user = await res.json();
            console.log(user);
            if(user.status){
                if(user.status == -1)
                    window.location.reload();
            }
        }
    }

    return(
        <main className="flex justify-center items-center w-screen h-screen">
            <div className="p-4 bg-slate-800 rounded-lg flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Users</h3>
                {
                    users.map(val => {
                        return(
                            <form key={String(val.id)} className="flex flex-col p-2 rounded-lg bg-slate-700 gap-1" onSubmit={(e) => handleSubmit(e, val.id)}>
                                <table className="border-separate border-spacing-2">
                                    <tbody>
                                        <tr>
                                            <td className="font-bold">Username:</td>
                                            <td>{val.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">E-mail:</td>
                                            <td>{val.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-bold">Role:</td>
                                            <td>
                                                <select name="role" className={"text-black p-1 cursor-pointer bg-slate-500 hover:bg-slate-600" } defaultValue={(roles.find(r => r.role == val.role))?.id}>
                                                    <option value={1}>Member</option>
                                                    <option value={2}>Admin</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Change passw.</td>
                                            <td>
                                                <input className="text-black" name="password" type="password" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button type="button" onClick={(e) => clickDelete(String(val.id))} className="bg-red-500 p-2 rounded-lg duration-500 hover:bg-red-700">
                                                    Delete
                                                </button>
                                            </td>
                                            <td className="flex justify-end">
                                                <button type="submit" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-900 duration-500">Save</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        )
                    })
                }
                <Link href="/profile">
                    <svg className="h-6 w-6 text-white hover:text-slate-400 duration-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
                </Link>
            </div>
        </main>
    )
}