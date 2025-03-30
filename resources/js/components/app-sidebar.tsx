import { Link, usePage } from "@inertiajs/react"
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Settings,
  Users,
  Users2
} from "lucide-react"

import AppearanceToggleDropdown from "@/components/appearance-dropdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export function AppSidebar() {
  const { url } = usePage()

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "O'quvchilar",
      href: "/students",
      icon: Users,
    },
    {
      title: "O'qituvchilar",
      href: "/teachers",
      icon: GraduationCap,
    },
    {
      title: "Kurslar",
      href: "/courses",
      icon: BookOpen,
    },
    {
      title: "Guruhlar",
      href: "/groups",
      icon: Users2,
    },
    {
      title: "Darslar",
      href: "/lesson-schedule",
      icon: BookOpen,
    },
    {
      title: "To'lovlar",
      href: "/payments",
      icon: CreditCard,
    },
    {
      title: "Statistika",
      href: "/statistics",
      icon: BarChart3,
    },
    {
      title: "Sozlamalar",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">O'quv Markaz</h1>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = url === item.href || (item.href !== "/" && url?.startsWith(item.href))

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "group transition-all duration-200",
                    isActive ? "bg-sidebar-accent font-medium" : "hover:bg-sidebar-accent/70",
                  )}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isActive ? "text-primary" : "text-sidebar-foreground group-hover:text-primary",
                      )}
                    />
                    <span>{item.title}</span>
                    {isActive && <ChevronRight className="ml-auto h-4 w-4 text-primary" />}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="border-2 border-primary">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <AppearanceToggleDropdown />
            <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:text-destructive">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
