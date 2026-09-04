import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
} from "lucide-react"
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"

import { OverviewPage } from "@/pages/dashboard/OverviewPage"
import { TaskBoardPage } from "@/pages/dashboard/TaskBoardPage"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NewTaskPage } from "./NewTaskPage"

export type DashboardRoute = "Overview" | "Task Board" | "New Task"

type DashboardNavItem = {
  label: DashboardRoute
  path: string
}

const dashboardRoutes: DashboardNavItem[] = [
  { label: "Overview", path: "/dashboard" },
  { label: "Task Board", path: "/dashboard/tasks" },
  { label: "New Task", path: "/dashboard/new-task" },
]

type DashboardProps = {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const activeRoute =
    dashboardRoutes.find((route) => route.path === location.pathname)?.label ??
    "Overview"

  return (
    <SidebarProvider defaultOpen>
      <main className="flex min-h-svh w-full bg-[#f4f7f4] text-[#17211d]">
        <Sidebar
          collapsible="offcanvas"
          className="bg-sidebar text-sidebar-foreground"
        >
          <SidebarHeader className="border-b border-[#dff4e8]/[0.16] p-5">
            <div className="grid size-10 place-items-center rounded-xl bg-[#dff4e8] font-extrabold text-[#11583b] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              TF
            </div>
            <div>
              <span className="block font-semibold tracking-tight">
                TaskFlow
              </span>
              <span className="block text-xs text-green-800 dark:text-[#b9d9c6]">
                Personal workspace
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-5">
            <p className="px-2 pb-2 text-[0.65rem] font-extrabold tracking-[0.14em] text-green-800 uppercase dark:text-[#9fe2ba]">
              Workspace
            </p>
            <SidebarMenu className="gap-1">
              {dashboardRoutes.map((route) => {
                const Icon =
                  route.label === "Overview"
                    ? LayoutDashboard
                    : route.label === "Task Board"
                      ? ClipboardList
                      : Plus
                return (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton
                      className="h-10 dark:text-[#35b76b] text-green-800 data-active:bg-[#dff4e8] data-active:text-[#11583b]"
                      isActive={activeRoute === route.label}
                      tooltip={route.label}
                      onClick={() => navigate(route.path)}
                    >
                      <Icon size={18} />
                      <span>{route.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-[#dff4e8]/[0.16] p-3">
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-10 dark:text-[#35b76b] text-green-800"
                  tooltip="Settings"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-10 dark:text-[#35b76b] text-green-800"
                  tooltip="Sign out"
                  onClick={onLogout}
                >
                  <LogOut size={18} />
                  <span>Sign out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[#dfe7e1] bg-white px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-[#718078]" />
              <div>
                <p className="text-xs font-extrabold tracking-[0.14em] text-[#19734d] uppercase">
                  Workspace
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-tight">
                  {activeRoute}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                className="hidden text-[#718078] sm:inline-flex"
                variant="ghost"
                size="icon"
                type="button"
                aria-label="Search"
              >
                <Search size={18} />
              </Button>
              <div className="grid size-9 place-items-center rounded-full bg-[#dff4e8] text-sm font-bold text-[#19734d]">
                JD
              </div>
            </div>
          </header>
          <Routes>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<OverviewPage />} />
            <Route
              path="/dashboard/tasks"
              element={
                <TaskBoardPage
                  onAddTask={() => navigate("/dashboard/new-task")}
                />
              }
            />
            <Route
              path="/dashboard/tasks/:taskId/edit"
              element={<NewTaskPage onCreated={() => navigate("/dashboard/tasks")} />}
            />
            <Route
              path="/dashboard/new-task"
              element={
                <NewTaskPage onCreated={() => navigate("/dashboard/tasks")} />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </section>
      </main>
    </SidebarProvider>
  )
}
