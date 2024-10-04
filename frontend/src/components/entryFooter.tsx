import { ModeToggle } from "./mode-toggle"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

const EntryFooter = () => {
  return (
  <div className="absolute bottom-4 right-4 flex gap-4 items-center">
      <a target="_blank" href="https://github.com/Akkilesh-A/Money-Manager" className="p-2 rounded-md border ">
          <GitHubLogoIcon width={20} height={20} />
      </a>
      <div className="dark:text-[#262626] text-[#e5e5e5]">{"|"}</div>
      <ModeToggle />
  </div>
  )
}

export default EntryFooter