import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  Button,
} from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { DollarSign, CreditCard, Target } from "lucide-react";
import { H2 } from "../ui";

const WalletCard = ({
  walletBalance,
  monthlyBudget,
  spendings = 1000,
  className,
}: {
  walletBalance: number;
  monthlyBudget: number;
  spendings?: number;
  className?: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <H2>Wallet Card</H2>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-green-100 rounded-full">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              Current Balance
            </p>
            <h3 className="text-2xl font-bold">
              ${walletBalance.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-muted-foreground">Spent</span>
            <span className="font-medium">
              ${spendings.toLocaleString()} / ${walletBalance.toLocaleString()}
            </span>
          </div>
          <Progress value={(spendings / walletBalance) * 100} className="h-2" />
        </div>

        <div className="flex justify-between">
          {/* Spendings */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Spendings
              </p>
              <p className="text-lg font-semibold">
                ${spendings.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Budget
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">
                    ${monthlyBudget.toLocaleString()}
                  </p>
                  <span className="text-sm font-medium text-muted-foreground">
                    {/* {targetPercentage.toFixed(0)}% achieved */}
                  </span>
                </div>
              </div>
            </div>
            {/* <Progress value={targetPercentage} className="h-2" /> */}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-4 items-center">
        <Button variant="secondary">Withdraw Money</Button>
        <Button variant="default">Add Money</Button>
      </CardFooter>
    </Card>
  );
};

export default WalletCard;
