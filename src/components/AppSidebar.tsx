import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"
import { Edit, House } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"

export function AppSidebar() {
  const route = usePathname()
  const isActive = (path: string) => route.includes(path)
  const isActiveHome = isActive("/home")
  const isActiveBlog = isActive("/our-blog")
  const [isMobile, setIsMobile] = React.useState(false)
  const { user } = useAuth()

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])


  return (
    <Sidebar side={isMobile ? "right" : "left"} className="!text-white font-semibold">
      <SidebarHeader>
        {isMobile && user && (
          <div className="flex flex-row items-center gap-2 px-4 py-2">
            <Avatar className="md:hidden block">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-white md:hidden block">
              {user.username}
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className={`text-gray-900 pt-8 px-4 mt-4 ${isMobile && "text-gray-200"}`}>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={isActiveHome} asChild>
              <Link href="/home" className="flex items-center gap-2">
                <House />
                <span className={`text-sm font-semibold`}>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={isActiveBlog} asChild>
              <Link href="/our-blog" className="flex items-center gap-2">
                <Edit />
                <span className={`text-sm font-semibold`}>Our Blog</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
