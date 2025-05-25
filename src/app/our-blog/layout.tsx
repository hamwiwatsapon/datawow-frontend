"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth();
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 h-14 bg-green-500 border-b shadow-sm z-20 w-full">
          <div className="text-white text-2xl font-castoro italic">a Board</div>
          {
            user ? <div className="flex flex-row gap-4 items-center">
              <div className="text-white hidden md:block">
                {user.username}
              </div>
              <Avatar className="hidden md:block">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <SidebarTrigger className="md:hidden block" />
            </div>
              :
              <div className="flex flex-row items-center">
                <div className="flex items-center gap-4 font-bold">
                  <Link href="/signin">
                    <Button variant="default" className="bg-success" >Sign in</Button>
                  </Link>
                </div>
                <SidebarTrigger />
              </div>
          }
        </header>

        {/* Sidebar + Content */}
        <div className="flex flex-1 w-full">
          <AppSidebar />
          <main className="p-4 overflow-y-auto bg-gray-100 flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
