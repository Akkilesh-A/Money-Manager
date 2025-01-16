import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { DollarSign, CreditCard, Target, Plus } from "lucide-react";
import { H2 } from "../ui";
import { useState } from "react";
import {
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSetBudgetMutation,
} from "@/redux/service/rtk-queries";
import { toast } from "sonner";

const WalletCard = ({
  walletBalance,
  monthlyBudget,
  spendings,
  className,
  handleRefetch,
}: {
  walletBalance: number;
  monthlyBudget: number;
  spendings: number;
  className?: string;
  handleRefetch: () => void;
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
            <h3 className="text-2xl font-bold">${walletBalance}</h3>
          </div>
          <AddMoneyDialog handleRefetch={handleRefetch} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-muted-foreground">Spent</span>
            <span className="font-medium">
              ${spendings} / ${walletBalance}
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
              <p className="text-lg font-semibold">${spendings}</p>
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
                  <p className="text-lg font-semibold">${monthlyBudget}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-4 items-center">
        <WithdrawMoneyDialog handleRefetch={handleRefetch} />
        <SetBudgetDialog handleRefetch={handleRefetch} />
      </CardFooter>
    </Card>
  );
};

const AddMoneyDialog = ({ handleRefetch }: { handleRefetch: () => void }) => {
  const [amount, setAmount] = useState(0);
  const [addMoney] = useAddMoneyMutation();

  const handleAddMoney = async () => {
    try {
      const response = await addMoney({ amount });
      setAmount(0);
      if (response.data.status == "success") {
        handleRefetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add money");
      console.error("Failed to add money:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Money</DialogTitle>
          <DialogDescription>Add money to your wallet</DialogDescription>
          <Input
            type="number"
            defaultValue={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={handleAddMoney}>
            Add Money
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const WithdrawMoneyDialog = ({
  handleRefetch,
}: {
  handleRefetch: () => void;
}) => {
  const [amount, setAmount] = useState(0);
  const [withdrawMoney] = useWithdrawMoneyMutation();

  const handleWithdrawMoney = async () => {
    try {
      const response = await withdrawMoney({ amount });
      setAmount(0);
      if (response.data.status == "success") {
        handleRefetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to withdraw money");
      console.error("Failed to withdraw money:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary">Withdraw Money</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Money</DialogTitle>
          <DialogDescription>Withdraw money from your wallet</DialogDescription>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={handleWithdrawMoney}>
            Withdraw Money
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SetBudgetDialog = ({ handleRefetch }: { handleRefetch: () => void }) => {
  const [amount, setAmount] = useState(0);
  const [change, setChange] = useState("add");
  const [setBudget] = useSetBudgetMutation();

  const handleSetBudget = async () => {
    try {
      const response = await setBudget({ amount, change });
      setAmount(0);
      setChange("add");

      if ("error" in response) {
        const error = response.error as {
          data: {
            message: string;
          };
        };
        toast.error(error.data.message);
        return;
      }

      if (response.data?.status === "success") {
        handleRefetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to set Budget money");
      console.log("Failed to set Budget money:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default">Set Budget</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Budget</DialogTitle>
          <DialogDescription>Set your monthly budget</DialogDescription>
          <Label>Amount</Label>
          <Input
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
          <Label>Add/Subtract</Label>
          <Select
            defaultValue="add"
            onValueChange={(value) => setChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Add/Subtract" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem defaultChecked value="add">
                Add
              </SelectItem>
              <SelectItem value="subtract">Subtract</SelectItem>
            </SelectContent>
          </Select>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant="default" onClick={handleSetBudget}>
            Set Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletCard;
