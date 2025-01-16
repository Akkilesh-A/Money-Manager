import { Button, H1, Skeleton } from "@/components/ui";
import { SideBarWrapper } from "@/components";
import { TagsCard, WalletCard } from "@/components/dashboard";
import {
  DailySpendsGraph,
  NoOfSpendsPerTagGraph,
  SpendsPerTagPieChart,
} from "@/components/graphs";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCcw } from "lucide-react";
import { useGetUserDataQuery } from "@/redux/service/rtk-queries";
import { setUser } from "@/redux/features/userSlice";
import { toast } from "sonner";
import { useEffect } from "react";

const DashboardPage = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();
  const { data: newUserData, isLoading, refetch } = useGetUserDataQuery({});

  function handleRefetch() {
    try {
      refetch();
      toast.success(newUserData.message);
      if (newUserData) {
        dispatch(setUser(newUserData.data.user));
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (newUserData) {
      dispatch(setUser(newUserData.data.user));
    }
  }, [newUserData]);

  return (
    <SideBarWrapper className="space-y-4">
      <div className="flex justify-between items-center">
        <H1>Dashboard</H1>
        <Button onClick={() => handleRefetch()}>
          <RefreshCcw className={isLoading ? "animate-spin" : ""} /> Refetch
          Data
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex w-full md:flex-row flex-col justify-between gap-4">
          {!userData ? (
            <Skeleton className="w-96 h-64" />
          ) : (
            <WalletCard
              handleRefetch={handleRefetch}
              walletBalance={userData.walletBalance}
              monthlyBudget={userData.monthlyBudget}
              spendings={userData.moneySpent}
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
