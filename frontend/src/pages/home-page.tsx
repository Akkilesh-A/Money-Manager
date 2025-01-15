import { badgeVariants, Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const HomePage = () => {
  function onClick() {
    toast.success("Hello");
  }
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Money Manager</h1>
      <Button onClick={onClick}>Click me for a toast</Button>
      <Link className={badgeVariants({ variant: "secondary" })} to="/signup">
        Sign Up
      </Link>
    </div>
  );
};

export default HomePage;
