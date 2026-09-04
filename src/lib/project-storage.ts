export type TaskStatus = "todo" | "in-progress" | "completed"
export type TaskPriority = "low" | "medium" | "high"

export type ProjectTask = {
  id: number
  title: string
  project: string
  assignee: string
  dueDate: string
  status: TaskStatus
  priority?: TaskPriority
  details?: string
}

export type Project = {
  id: number
  name: string
  tasks: ProjectTask[]
}

export const PROJECTS_STORAGE_KEY = "taskflow_projects"

const starterProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    tasks: [
      { id: 1, title: "Design Landing Page", project: "Website Redesign", assignee: "Sarah", dueDate: "2026-09-05", status: "todo" },
      { id: 2, title: "Review navigation concepts", project: "Website Redesign", assignee: "Jordan", dueDate: "2026-09-08", status: "in-progress" },
      { id: 3, title: "Approve responsive layouts", project: "Website Redesign", assignee: "Emma", dueDate: "2026-09-11", status: "todo" },
    ],
  },
  {
    id: 2,
    name: "Mobile App Launch",
    tasks: [{ id: 4, title: "Prepare app store assets", project: "Mobile App Launch", assignee: "Alex", dueDate: "2026-09-06", status: "todo" }],
  },
  {
    id: 3,
    name: "Marketing Campaign",
    tasks: [{ id: 5, title: "Finalize campaign messaging", project: "Marketing Campaign", assignee: "Emma", dueDate: "2026-09-03", status: "todo" }],
  },
  {
    id: 4,
    name: "Product Research",
    tasks: [{ id: 6, title: "Summarize user interviews", project: "Product Research", assignee: "Sam", dueDate: "2026-09-02", status: "completed" }],
  },
  {
    id: 5,
    name: "Content Library",
    tasks: [{ id: 7, title: "Organize help center articles", project: "Content Library", assignee: "Jordan", dueDate: "2026-09-10", status: "in-progress" }],
  },
  {
    id: 6,
    name: "Analytics Setup",
    tasks: [{ id: 8, title: "Connect conversion events", project: "Analytics Setup", assignee: "Alex", dueDate: "2026-09-12", status: "todo" }],
  },
  {
    id: 7,
    name: "Brand Refresh",
    tasks: [{ id: 9, title: "Review updated brand colors", project: "Brand Refresh", assignee: "Sarah", dueDate: "2026-09-07", status: "completed" }],
  },
  {
    id: 8,
    name: "Team Operations",
    tasks: [{ id: 10, title: "Update team onboarding guide", project: "Team Operations", assignee: "Sam", dueDate: "2026-09-15", status: "todo" }],
  },
]

export function getProjects(): Project[] {
  const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY)

  if (storedProjects) {
    try {
      return JSON.parse(storedProjects) as Project[]
    } catch {
      localStorage.removeItem(PROJECTS_STORAGE_KEY)
    }
  }

  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(starterProjects))
  return starterProjects
}

export function getAllTasks(projects: Project[]): ProjectTask[] {
  return projects.flatMap((project) => project.tasks)
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects))
}

export function updateTaskStatus(projects: Project[], taskId: number, status: TaskStatus): Project[] {
  const updatedProjects = projects.map((project) => ({
    ...project,
    tasks: project.tasks.map((task) => task.id === taskId ? { ...task, status } : task),
  }))

  saveProjects(updatedProjects)
  return updatedProjects
}

export function createTask(
  projects: Project[],
  task: Omit<ProjectTask, "id">,
  projectName: string
): Project[] {
  const nextId = Math.max(0, ...getAllTasks(projects).map((currentTask) => currentTask.id)) + 1
  const updatedProjects = projects.map((project) =>
    project.name === projectName
      ? { ...project, tasks: [...project.tasks, { ...task, id: nextId }] }
      : project
  )

  saveProjects(updatedProjects)
  return updatedProjects
}

export function getTaskById(taskId: number): ProjectTask | undefined {
  return getAllTasks(getProjects()).find((task) => task.id === taskId)
}

export function updateTask(taskId: number, changes: Omit<ProjectTask, "id">) {
  const updatedProjects = getProjects().map((project) => ({
    ...project,
    tasks: project.tasks.map((task) =>
      task.id === taskId ? { ...changes, id: taskId } : task
    ),
  }))

  saveProjects(updatedProjects)
  return updatedProjects
}
