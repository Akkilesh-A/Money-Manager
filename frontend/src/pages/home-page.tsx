import { badgeVariants, H1 } from "@/components/ui";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <H1>Money Manager</H1>
      <div className="flex gap-4">
        <Link className={badgeVariants({ variant: "secondary" })} to="/signup">
          Sign Up
        </Link>
        <Link className={badgeVariants({ variant: "secondary" })} to="/signin">
          Sign In
        </Link>
        <Link
          className={badgeVariants({ variant: "secondary" })}
          to="/dashboard"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
