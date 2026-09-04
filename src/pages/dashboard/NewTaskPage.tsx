import { useState } from "react"
import { ArrowLeft, ArrowRight, Save } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  createTask,
  getProjects,
  getTaskById,
  updateTask,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/project-storage"

type NewTaskPageProps = {
  onCreated: () => void
}

export function NewTaskPage({ onCreated }: NewTaskPageProps) {
  const navigate = useNavigate()
  const { taskId } = useParams()
  const isEditing = Boolean(taskId)
  const [projects] = useState(getProjects)
  const [task] = useState(() =>
    taskId ? getTaskById(Number(taskId)) : undefined
  )
  const [title, setTitle] = useState(task?.title ?? "")
  const [project, setProject] = useState(
    task?.project ?? projects[0]?.name ?? ""
  )
  const [assignee, setAssignee] = useState(task?.assignee ?? "Jordan")
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? "medium"
  )
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "")
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "todo")
  const [details, setDetails] = useState(task?.details ?? "")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const taskData = {
      title,
      project,
      assignee,
      dueDate,
      status,
      priority,
      details,
    }

    if (isEditing && task) {
      updateTask(task.id, taskData)
    } else {
      createTask(projects, taskData, project)
    }

    onCreated()
  }

  if (isEditing && !task) {
    return (
      <div className="p-5 sm:p-8">
        <h2 className="text-2xl font-semibold">Task not found</h2>
        <Button
          className="mt-5"
          type="button"
          onClick={() => navigate("/dashboard/tasks")}
        >
          Back to task board
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-5 sm:p-8">
      {isEditing && (
        <button
          className="mb-6 flex items-center gap-2 text-sm font-medium text-[#718078] hover:text-[#19734d]"
          type="button"
          onClick={() => navigate("/dashboard/tasks")}
        >
          <ArrowLeft size={16} /> Back to task board
        </button>
      )}
      <div className="mb-8">
        <p className="text-xs font-extrabold tracking-[0.14em] text-[#19734d] uppercase">
          {isEditing ? "Edit task" : "Create task"}
        </p>
        <h2 className="mt-2 text-3xl font-medium tracking-tight">
          {isEditing ? "Update task details." : "Add something to the board."}
        </h2>
        <p className="mt-2 text-[#718078]">
          {isEditing
            ? "Changes are saved to your local workspace."
            : "Give your team a clear next step."}
        </p>
      </div>
      <form
        className="max-w-xl space-y-5 rounded-2xl border border-[#dfe7e1] bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="mb-2 block text-sm font-bold text-[#3c4942]"
            htmlFor="task-title"
          >
            Task title
          </label>
          <input
            className="h-12 w-full rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] px-4 outline-none focus:border-[#19734d] focus:ring-4 focus:ring-[#19734d]/10"
            id="task-title"
            placeholder="e.g. Finalize product brief"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-bold text-[#3c4942]"
            htmlFor="task-project"
          >
            Project
          </label>
          <select
            className="h-12 w-full rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] px-4 outline-none focus:border-[#19734d]"
            id="task-project"
            value={project}
            onChange={(event) => setProject(event.target.value)}
          >
            {projects.map((currentProject) => (
              <option key={currentProject.id}>{currentProject.name}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className="mb-2 block text-sm font-bold text-[#3c4942]"
              htmlFor="task-assignee"
            >
              Assignee
            </label>
            <select
              className="h-12 w-full rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] px-4 outline-none focus:border-[#19734d]"
              id="task-assignee"
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
            >
              <option>Jordan</option>
              <option>Alex</option>
              <option>Sam</option>
              <option>Sarah</option>
              <option>Emma</option>
            </select>
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-bold text-[#3c4942]"
              htmlFor="task-priority"
            >
              Priority
            </label>
            <select
              className="h-12 w-full rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] px-4 outline-none focus:border-[#19734d]"
              id="task-priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TaskPriority)
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className="mb-2 block text-sm font-bold text-[#3c4942]"
              htmlFor="task-due-date"
            >
              Due date
            </label>
            <input
              className="h-12 w-full rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] px-4 outline-none focus:border-[#19734d] focus:ring-4 focus:ring-[#19734d]/10"
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              required
            />
          </div>
          {isEditing && (
            <div>
              <label
                className="mb-2 block text-sm font-bold text-[#3c4942]"
                htmlFor="task-status"
              >
                Status
              </label>
              <select
                className="h-12 w-full rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] px-4 outline-none focus:border-[#19734d]"
                id="task-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as TaskStatus)
                }
              >
                <option value="todo">To do</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Done</option>
              </select>
            </div>
          )}
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-bold text-[#3c4942]"
            htmlFor="task-details"
          >
            Details
          </label>
          <textarea
            className="min-h-32 w-full resize-y rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] p-4 outline-none focus:border-[#19734d] focus:ring-4 focus:ring-[#19734d]/10"
            id="task-details"
            placeholder="Add context for your team..."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>
        <Button type="submit" className="bg-[#19734d] hover:bg-[#11583b] w-30 h-10 cursor-pointer">
          {isEditing ? (
            <>
              <Save size={17} /> Save changes
            </>
          ) : (
            <>
              <ArrowRight size={17} /> Create task
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
