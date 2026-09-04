import { useState } from "react"
import { FolderKanban, Pencil, Plus, Search, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  getAllTasks,
  getProjects,
  updateTaskStatus,
  type ProjectTask,
  type TaskStatus,
} from "@/lib/project-storage"

type TaskBoardPageProps = {
  onAddTask: () => void
}

export function TaskBoardPage({ onAddTask }: TaskBoardPageProps) {
  const navigate = useNavigate()
  const [projects, setProjects] = useState(getProjects)
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null)
  const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null)
  const [assigneeFilter, setAssigneeFilter] = useState("")
  const [projectFilter, setProjectFilter] = useState("")
  const tasks = getAllTasks(projects)
  const filteredTasks = tasks.filter(
    (task) =>
      (!assigneeFilter || task.assignee === assigneeFilter) &&
      (!projectFilter || task.project === projectFilter)
  )

  function handleStatusChange(taskId: number, status: TaskStatus) {
    setProjects((currentProjects) =>
      updateTaskStatus(currentProjects, taskId, status)
    )
  }

  function handleDrop(status: TaskStatus) {
    if (draggedTaskId !== null) {
      handleStatusChange(draggedTaskId, status)
    }
    setDraggedTaskId(null)
    setDragOverStatus(null)
  }

  function renderTask(task: ProjectTask) {
    return (
      <article
        className={`cursor-grab rounded-lg border border-[#dfe7e1] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing ${draggedTaskId === task.id ? "opacity-50" : ""}`}
        key={task.id}
        draggable
        onDragStart={() => setDraggedTaskId(task.id)}
        onDragEnd={() => {
          setDraggedTaskId(null)
          setDragOverStatus(null)
        }}
      >
        <p className="text-sm leading-6 font-semibold">{task.title}</p>
        <p className="mt-2 text-xs text-[#718078]">
          {task.project} · {task.assignee}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#dff4e8] px-2 py-1 text-[0.68rem] font-bold text-[#19734d]">
            Due {task.dueDate}
          </span>
          <div className="flex items-center gap-2">
            <select
              className="rounded-md border border-[#dfe7e1] bg-[#fbfdfb] px-2 py-1 text-xs font-medium outline-none focus:border-[#19734d]"
              value={task.status}
              aria-label={`Change status for ${task.title}`}
              onChange={(event) =>
                handleStatusChange(task.id, event.target.value as TaskStatus)
              }
            >
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Done</option>
            </select>
            <Button
              className="size-8 shrink-0 text-[#718078] hover:bg-[#dff4e8] hover:text-[#19734d] hover:scale-105 cursor-pointer bg-[#dff4e8]"
              variant="ghost"
              size="icon"
              type="button"
              aria-label={`Edit ${task.title}`}
              onClick={(event) => {
                event.stopPropagation()
                navigate(`/dashboard/tasks/${task.id}/edit`)
              }}
            >
              <Pencil size={15} />
            </Button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-[#19734d] uppercase">
            Project flow
          </p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight">
            Task board
          </h2>
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <div className="flex h-9 min-w-60 flex-1 items-center gap-2 rounded-md border border-[#dfe7e1] bg-white px-3 text-[#718078] shadow-sm sm:flex-none">
            <Search size={16} aria-hidden="true" />
            <select
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#17211d] outline-none"
              value={assigneeFilter}
              aria-label="Filter tasks by user"
              onChange={(event) => setAssigneeFilter(event.target.value)}
            >
              <option value="">All users</option>
              {[...new Set(tasks.map((task) => task.assignee))]
                .sort()
                .map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
            </select>
            {assigneeFilter && (
              <button
                className="text-[#718078] hover:text-[#17211d] cursor-pointer"
                type="button"
                aria-label="Clear user filter"
                onClick={() => setAssigneeFilter("")}
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div className="flex h-9 min-w-60 flex-1 items-center gap-2 rounded-md border border-[#dfe7e1] bg-white px-3 text-[#718078] shadow-sm sm:flex-none">
            <FolderKanban size={16} aria-hidden="true" />
            <select
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#17211d] outline-none"
              value={projectFilter}
              aria-label="Filter tasks by project"
              onChange={(event) => setProjectFilter(event.target.value)}
            >
              <option value="">All projects</option>
              {[...new Set(tasks.map((task) => task.project))]
                .sort()
                .map((project) => (
                  <option key={project} value={project}>{project}</option>
                ))}
            </select>
            {projectFilter && (
              <button
                className="text-[#718078] hover:text-[#17211d] cursor-pointer"
                type="button"
                aria-label="Clear project filter"
                onClick={() => setProjectFilter("")}
              >
                <X size={15} />
              </button>
            )}
          </div>
          <Button
            className="cursor-pointer rounded-md bg-[#19734d] hover:bg-[#11583b]"
            onClick={onAddTask}
          >
            <Plus size={17} /> Add task
          </Button>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          { label: "To do", status: "todo" },
          { label: "In progress", status: "in-progress" },
          { label: "Done", status: "completed" },
        ].map((column) => (
          <div
            className={`min-h-64 rounded-xl p-3 transition-colors ${dragOverStatus === column.status ? "bg-[#ccebd9] ring-2 ring-[#19734d]/30" : "bg-[#eaf0eb]"}`}
            key={column.status}
            onDragOver={(event) => {
              event.preventDefault()
              setDragOverStatus(column.status as TaskStatus)
            }}
            onDragLeave={() => setDragOverStatus(null)}
            onDrop={() => handleDrop(column.status as TaskStatus)}
          >
            <div className="mb-3 flex items-center justify-between px-2">
              <h3 className="text-sm font-bold">{column.label}</h3>
              <span className="grid size-6 place-items-center rounded-full bg-white text-xs text-[#718078]">
                {
                  filteredTasks.filter((task) => task.status === column.status)
                    .length
                }
              </span>
            </div>
            <div className="space-y-3">
              {filteredTasks
                .filter((task) => task.status === column.status)
                .map(renderTask)}
              {filteredTasks.filter((task) => task.status === column.status)
                .length === 0 && (
                <p className="rounded-lg border border-dashed border-[#c8d8cc] px-3 py-6 text-center text-xs text-[#718078]">
                  {assigneeFilter || projectFilter
                    ? "No tasks match the selected filters"
                    : "No tasks yet"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
