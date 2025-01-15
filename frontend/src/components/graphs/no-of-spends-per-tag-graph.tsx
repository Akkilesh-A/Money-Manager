import { Card, H2, CardHeader, CardContent } from "../ui";
import { BarChart } from "lucide-react";

const NoOfSpendsPerTagGraph = () => {
  return (
    <Card>
      <CardHeader>
        <H2>No Of Spends Per Tag</H2>
      </CardHeader>
      <CardContent>
        <BarChart />
      </CardContent>
    </Card>
  );
};

export default NoOfSpendsPerTagGraph;
