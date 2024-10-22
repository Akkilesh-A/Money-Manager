import { EntryFooter, SignInForm } from "../components"
import { H1 } from "../components/ui"

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center">
        <div className="flex h-[100dvh] w-[100dvw]">
          <div className="bg-gray-600 hidden sm:flex items-center justify-center w-1/2 px-8">
            <H1 className="">
              Money Manager for the {" "}
              <span className="font-mono bg-gray-800/30 rounded-md ">
              finance freak 
              </span>
              {" "}in you!
            </H1>
          </div>
          <div className="flex justify-center w-full h-[100dvh] items-center sm:w-1/2">
            <SignInForm />
          </div>
        </div>
        <EntryFooter />
    </div>
  )
}

export default SignInPage