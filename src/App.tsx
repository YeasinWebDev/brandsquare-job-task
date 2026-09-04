import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, LockKeyhole, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dashboard } from "@/pages/dashboard/Dashboard"

const LOGIN_STORAGE_KEY = "brandsquare_logged_in"

export function App() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(LOGIN_STORAGE_KEY) === "true"
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    localStorage.setItem(LOGIN_STORAGE_KEY, "true")
    setIsLoggedIn(true)
    navigate("/dashboard")
  }

  function handleLogout() {
    localStorage.removeItem(LOGIN_STORAGE_KEY)
    setIsLoggedIn(false)
    navigate("/")
  }

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />
  }

  return (
    <main className="grid min-h-svh grid-cols-[minmax(280px,0.9fr)_minmax(420px,1.1fr)] text-[#17211d] max-[760px]:block">
      <section className="relative flex min-h-full flex-col justify-between overflow-hidden bg-[#11583b] p-[clamp(2rem,6vw,6rem)] text-[#f4fff8] max-[760px]:min-h-[310px] max-[760px]:p-8">
        <div className="absolute top-[13%] -right-[18%] size-[520px] rounded-full border border-[#dff4e8]/[0.18] max-[760px]:size-[380px]" />
        <div className="absolute right-[8%] -bottom-[14%] size-[340px] rounded-full border border-[#dff4e8]/[0.18] max-[760px]:size-[250px]" />
        <div className="relative z-10 grid size-[42px] place-items-center rounded-xl bg-[#dff4e8] text-[1.3rem] font-extrabold text-[#11583b]">
          TF
        </div>
        <div className="relative z-10 my-auto max-w-[420px] max-[760px]:mt-12 max-[760px]:mb-0">
          <p className="mb-4 text-[0.72rem] font-extrabold tracking-[0.14em] text-[#9fe2ba] uppercase">
            TaskFlow
          </p>
          <h2 className="m-0 max-w-[360px] text-[clamp(2.8rem,5vw,5rem)] leading-[0.98] font-medium tracking-[-0.045em] max-[760px]:text-[2.6rem]">
            Make space for better work.
          </h2>
          <p className="mt-6 max-w-75 text-base leading-[1.7] text-[#b9d9c6] max-[760px]:hidden">
            One calm place for your team to think, build, and move forward.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-[0.65rem] text-[0.78rem] text-[#b9d9c6] max-[760px]:hidden">
          <span className="size-2 rounded-full bg-[#9fe2ba] shadow-[0_0_0_5px_rgba(159,226,186,0.14)]" />
          Trusted workspace access
        </div>
      </section>

      <section className="flex min-h-full flex-col justify-center bg-white p-[clamp(2rem,8vw,8rem)] max-[760px]:min-h-[calc(100svh-310px)] max-[760px]:px-8 max-[760px]:py-14">
        <div className="m-auto w-full max-w-107.5">
          <div>
            <p className="mb-4 text-[0.72rem] font-extrabold tracking-[0.14em] text-[#19734d] uppercase">
              Welcome back
            </p>
            <h1 className="m-0 max-w-[400px] text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.045em]">
              Sign in to your workspace
            </h1>
            <p className="mt-[1.1rem] leading-relaxed text-[#718078]">
              Enter your details to continue where you left off.
            </p>
          </div>

          <form
            className="mt-10 flex flex-col gap-[0.65rem]"
            onSubmit={handleSubmit}
          >
            <label
              className="text-[0.82rem] font-bold text-[#3c4942]"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="flex h-[52px] items-center gap-3 rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] px-4 text-[#849189] transition focus-within:border-[#19734d] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(25,115,77,0.1)]">
              <Mail size={18} aria-hidden="true" />
              <input
                className="w-full border-0 bg-transparent text-[0.92rem] text-[#17211d] outline-none placeholder:text-[#a3ada7]"
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>

            <div className="mt-[0.65rem] flex items-center justify-between text-[0.82rem] font-bold text-[#3c4942]">
              <label htmlFor="password">Password</label>
              <button
                className="font-inherit border-0 bg-transparent p-0 text-[#19734d]"
                type="button"
              >
                Forgot password?
              </button>
            </div>
            <div className="flex h-[52px] items-center gap-3 rounded-lg border border-[#dfe7e1] bg-[#fbfdfb] px-4 text-[#849189] transition focus-within:border-[#19734d] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(25,115,77,0.1)]">
              <LockKeyhole size={18} aria-hidden="true" />
              <input
                className="w-full border-0 bg-transparent text-[0.92rem] text-[#17211d] outline-none placeholder:text-[#a3ada7]"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <label className="my-[0.55rem] flex items-center gap-[0.6rem] text-[0.82rem] font-medium text-[#718078]">
              <input
                className="size-4 accent-[#19734d]"
                type="checkbox"
                defaultChecked
              />
              <span>Keep me signed in</span>
            </label>

            <Button
              className="flex h-[52px] w-full items-center justify-center gap-[0.7rem] rounded-lg bg-[#19734d] font-bold hover:bg-[#11583b]"
              type="submit"
            >
              Demo Sign in
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="mt-8 text-center text-[0.86rem] text-[#718078]">
            Don&apos;t have an account?{" "}
            <button
              className="border-0 bg-transparent p-0 font-bold text-[#19734d]"
              type="button"
            >
              Create one
            </button>
          </p>
        </div>
        <p className="m-auto mt-8 pb-0 text-center text-[0.72rem] text-[#9aa69e]">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </section>
    </main>
  )
}

export default App
