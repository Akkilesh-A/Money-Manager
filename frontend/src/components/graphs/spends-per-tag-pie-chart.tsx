import { Card, H2, CardHeader, CardContent } from "../ui";
import { PieChart } from "lucide-react";

const SpendsPerTagPieChart = () => {
  return (
    <Card>
      <CardHeader>
        <H2>Spends Per Tag</H2>
      </CardHeader>
      <CardContent>
        <PieChart />
      </CardContent>
    </Card>
  );
};

export default SpendsPerTagPieChart;
