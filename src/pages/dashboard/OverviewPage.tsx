import { useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  FolderKanban,
  ListChecks,
} from "lucide-react"

import {
  getAllTasks,
  getProjects,
} from "@/lib/project-storage"
import { DueSoonTask } from "@/components/DueSoonTask"

const today = "2026-09-04"


export function OverviewPage() {
  const [projects] = useState(getProjects)
  const tasks = getAllTasks(projects)
  const activeProjects = projects.filter((project) =>
    project.tasks.some((task) => task.status !== "completed")
  ).length
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length
  const overdueTasks = tasks.filter(
    (task) => task.dueDate < today && task.status !== "completed"
  ).length
  const dueSoonTasks = tasks
    .filter((task) => task.dueDate >= today && task.status !== "completed")
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate))
    .slice(0, 5)

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-[#19734d] uppercase">
            Good morning, Jordan
          </p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight">
            Here&apos;s your overview.
          </h2>
          <p className="mt-2 text-[#718078]">
            A quick look at what needs your attention.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#718078]">
          <ListChecks size={18} className="text-[#19734d]" /> {tasks.length}{" "}
          tasks tracked
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total tasks",
            value: tasks.length,
            icon: ListChecks,
            color: "text-[#19734d]",
            iconBackground: "bg-[#dff4e8]",
          },
          {
            label: "Active projects",
            value: activeProjects,
            icon: FolderKanban,
            color: "text-blue-600",
            iconBackground: "bg-blue-50",
          },

          {
            label: "Overdue",
            value: overdueTasks,
            icon: AlertTriangle,
            color: "text-red-600",
            iconBackground: "bg-red-50",
          },
          {
            label: "Completed",
            value: completedTasks,
            icon: CheckCircle2,
            color: "text-emerald-600",
            iconBackground: "bg-emerald-50",
          },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-[#e3e9e5] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cddbd3] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#718078]">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#18251e]">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`grid size-11 place-items-center rounded-xl ${stat.iconBackground} ${stat.color}`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold">Due soon</h3>
        <div className="rounded-xl border border-[#dfe7e1] bg-white px-4 shadow-sm sm:px-5">
          {dueSoonTasks.length > 0 ? (
            dueSoonTasks.map((task) => (
              <DueSoonTask key={task.id} task={task} />
            ))
          ) : (
            <p className="py-6 text-sm text-[#718078]">No upcoming tasks.</p>
          )}
        </div>
      </div>
    </div>
  )
}
