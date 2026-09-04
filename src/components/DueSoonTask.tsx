import type { ProjectTask } from "@/lib/project-storage"


const today = "2026-09-04"

export function DueSoonTask({ task }: { task: ProjectTask }) {
  const isOverdue = task.dueDate < today && task.status !== "completed"
  const statusLabel = isOverdue ? "Overdue" : formatDueDate(task.dueDate)
  const statusClass = isOverdue
    ? "bg-red-100 text-red-600"
    : task.dueDate === "2026-09-05"
      ? "bg-orange-100 text-orange-700"
      : "bg-blue-100 text-blue-700"

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-[#eef2ef] py-4 last:border-0 sm:flex-nowrap">
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}
      >
        {statusLabel}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium">
        {task.title}
      </span>
      <span className="text-xs text-[#718078]">{task.assignee}</span>
    </div>
  )
}

function formatDueDate(date: string) {
  if (date === today) return "Today"
  const difference = Math.ceil(
    (new Date(`${date}T00:00:00`).getTime() -
      new Date(`${today}T00:00:00`).getTime()) /
      86_400_000
  )
  if (difference === 1) return "Tomorrow"
  if (difference > 1 && difference < 8)
    return `Sep ${new Date(`${date}T00:00:00`).getDate()}`
  return date
}