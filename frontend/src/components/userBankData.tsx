import { Card, CardContent, CardHeader, CardTitle, Progress } from "../components/ui"
import { DollarSign, CreditCard, Target } from "lucide-react"

export default function UserBankDataCard({ 
  currentBalance = 3500, 
  maxLimit = 5000, 
  monthlyTarget = 4000 
}: { 
  currentBalance?: number
  maxLimit?: number
  monthlyTarget?: number
}) {
  const balancePercentage = (currentBalance / maxLimit) * 100
  const targetPercentage = (currentBalance / monthlyTarget) * 100

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Bank Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-green-100 rounded-full">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
            <h3 className="text-2xl font-bold">${currentBalance.toLocaleString()}</h3>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-muted-foreground">Balance</span>
            <span className="font-medium">${currentBalance.toLocaleString()} / ${maxLimit.toLocaleString()}</span>
          </div>
          <Progress value={balancePercentage} className="h-2" />
        </div>

        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Max Limit</p>
            <p className="text-lg font-semibold">${maxLimit.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Monthly Target</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">${monthlyTarget.toLocaleString()}</p>
                <span className="text-sm font-medium text-muted-foreground">
                  {targetPercentage.toFixed(0)}% achieved
                </span>
              </div>
            </div>
          </div>
          <Progress value={targetPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}