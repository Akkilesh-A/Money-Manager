import { H1 } from "@/components/ui";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const user = useSelector((state: any) => state.user.value);
  return (
    <div className="">
      <H1>Dashboard</H1>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default DashboardPage;
