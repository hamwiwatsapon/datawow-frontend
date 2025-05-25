"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

type User = {
  id: string
  username: string
}

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Try to load user from cookie on mount
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="))
    if (cookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(cookie.split("=")[1]))
        setUser(userData)
      } catch {
        setUser(null)
      }
    }
  }, [])

  const login = (user: User) => {
    setUser(user)
    document.cookie = `userData=${encodeURIComponent(JSON.stringify(user))}; path=/`
  }

  const logout = () => {
    setUser(null)
    document.cookie = "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}