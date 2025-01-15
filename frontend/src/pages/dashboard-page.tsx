import { H1, Skeleton } from "@/components/ui";
import { SideBarWrapper } from "@/components";
import { TagsCard, WalletCard } from "@/components/dashboard";
import {
  DailySpendsGraph,
  NoOfSpendsPerTagGraph,
  SpendsPerTagPieChart,
} from "@/components/graphs";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  // const navigate= useNavigate()
  let userData: any;
  const [isLoading, setIsLoading] = useState(true);
  // const [spendings,setSpendings]= useState(100)
  const spendings = 100;
  userData = useSelector((state: any) => state.user.value);

  useEffect(() => {
    if (!userData) {
      // navigate("/signin")
    }
    setIsLoading(false);
  }, []);

  return (
    <SideBarWrapper className="space-y-4">
      <H1>Dashboard</H1>
      <div className="space-y-4">
        <div className="flex w-full md:flex-row flex-col justify-between gap-4">
          {isLoading ? (
            <Skeleton className="w-96 h-64" />
          ) : (
            <WalletCard
              walletBalance={userData.walletBalance}
              monthlyBudget={userData.monthlyBudget}
              spendings={spendings}
            />
          )}
          <DailySpendsGraph className="flex-1" />
        </div>
        {/* Small Graph 1,2 and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          <NoOfSpendsPerTagGraph />
          <TagsCard />
          <SpendsPerTagPieChart />
        </div>
      </div>
    </SideBarWrapper>
  );
};

export default DashboardPage;
