import { EntryFooter, SignInForm } from "../components"

const SignInPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
        <SignInForm />
        <EntryFooter />
    </div>
  )
}

export default SignInPage