"use client";
import { Login } from "@/api/login";
import { useAuth } from "@/hooks/useAuth";
import { Dot } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();

  // Check if user is already logged in via cookie
  // If user is already logged in, redirect to home
  useEffect(() => {
    const checkUserCookie = async () => {
      const cookieItem = await cookieStore.get("userData");
      if (cookieItem && cookieItem.value) {
        try {
          // Decode before parsing
          const decoded = decodeURIComponent(cookieItem.value);
          const userData = JSON.parse(decoded);
          if (userData) {
            login(userData);
          }
          console.log("User already logged in:", userData);
          window.location.href = "/home"; // Redirect to home page
        } catch (e) {
          console.error("Failed to parse user cookie:", e);
        }
      }
    };
    checkUserCookie();
    setLoading(false);

  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-black bg-white bg-opacity-10 ">
      <Dot className="animate-bounce delay-100" size={50} />
      <Dot className="animate-bounce delay-150" size={50} />
      <Dot className="animate-bounce delay-200" size={50} />
    </div>;
  }
  const handleLogin = async (username: string) => {
    Login(username)
      .then((data) => {
        login(data);
        console.log("Login successful:", data);
        // Redirect to home page or handle successful login
        window.location.href = "/home";
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Handle login failure (e.g., show an error message)
      });
  }
  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row bg-green-500">
      {/* Icon Section */}
      <div className="bg-green-300 rounded-b-xl w-full md:w-[45%] flex items-center justify-center flex-col order-1 md:order-2 p-6 md:p-0 md:rounded-xl">
        <Image
          src="/home-icon.png"
          alt="postblog"
          width={300}
          height={230}
          className="mb-5 w-50 h-auto sm:w-[300px] sm:h-[230px]"
          style={{ objectFit: "contain" }}
        />
        <h1 className="text-xl italic font-castoro">a Board</h1>
      </div>
      {/* Login Section */}
      <div className="w-full md:w-[55%] order-2 md:order-1 bg-green-500 flex flex-col flex-1 items-center justify-center">
        <div className="w-80 max-w-full h-full flex  justify-center flex-col p-8">
          <h1 className="text-[28px] font-inter mb-5 text-white">
            Sign in
          </h1>
          <input
            className="bg-white rounded-md p-2 w-full"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <button className="bg-green-300 rounded-md p-2 w-full mt-5"
            onClick={() => handleLogin(username)}
          >
            <p className="text-center text-white">Sign in</p>
          </button>
        </div>
      </div>
    </div>
  );
}