import { Card, CardHeader, CardContent, H2 } from "../ui";

const DailySpendsGraph = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <H2>Daily Spends Graph</H2>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default DailySpendsGraph;
