'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default async function Home() {
  const {data: session, status} = useSession()
  const route = useRouter()

  return (
    <main>
      none
    </main>
  );
}
