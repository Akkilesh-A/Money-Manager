import {   
  Button, 
  Card, 
  CardHeader,
  CardContent, 
  CardFooter, 
  CardTitle, 
  ColorPicker, 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger, 
  Input,
  Label,
  Progress 
} from "./ui"
import { BadgeIndianRupee, IndianRupee, Plus, Target } from "lucide-react"
import { useForm } from "react-hook-form"

export default function UserBankDataCard({ 
  currentBalance = 0, 
  monthlyTarget = 0,
  totalSpent = 0
}: { 
  currentBalance?: number
  monthlyTarget?: number,
  totalSpent?: number
}) {
  const targetPercentage = (currentBalance / monthlyTarget) * 100
  const {register,handleSubmit} =useForm()

  async function onSubmit(data:any) {
    console.log(data)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-green-100 rounded-full">
            <IndianRupee className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
            <h3 className="text-2xl font-bold">${currentBalance.toLocaleString()}</h3>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <BadgeIndianRupee className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">${totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Monthly Target</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">${monthlyTarget.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-muted-foreground">Target</span>
            <span className="font-medium">${currentBalance.toLocaleString()} / ${monthlyTarget.toLocaleString()}</span>
          </div>
          <Progress value={targetPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>
                  Withdraw Money
              </Button>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Create New Tag</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4  py-4">
                <Label>New Tag Name</Label>
                <Input
                    type="text"
                    placeholder="Tag Name"
                    {...register("newTag",{
                        required:{
                            value:true,
                            message:"Tag Name is required"
                        }
                    })}
                />
                {/* {errors.newTag && <Badge variant={"destructive"}>{errors.newTag.message}</Badge>} */}
                <Label>Tag Color</Label>
                <div className="flex justify-end">
                    <Button>Add New Tag</Button>
                </div>
            </form>
            </DialogContent>
        </Dialog>
        <Dialog>
            <DialogTrigger asChild>
              <Button>
                  Add Money
              </Button>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Create New Tag</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4  py-4">
                <Label>New Tag Name</Label>
                <Input
                    type="text"
                    placeholder="Tag Name"
                    {...register("newTag",{
                        required:{
                            value:true,
                            message:"Tag Name is required"
                        }
                    })}
                />
                {/* {errors.newTag && <Badge variant={"destructive"}>{errors.newTag.message}</Badge>} */}
                <Label>Tag Color</Label>
                <div className="flex justify-end">
                    <Button>Add New Tag</Button>
                </div>
            </form>
            </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}