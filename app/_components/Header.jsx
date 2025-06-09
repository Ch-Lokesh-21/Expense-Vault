"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <h1 className="text-2xl text-primary">Expense Vault</h1>
      {isSignedIn ? (
        <>
          <Link href={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </>
      ) : (
        <div className="flex gap-3 items-center">
          <Link href={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
