"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function SignIn(): React.ReactElement {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()} type="button">
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Link href="/sign-in">Sign in</Link>
    </>
  );
}
