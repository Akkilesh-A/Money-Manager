import { TagsIcon } from "lucide-react";
import { Card, CardHeader, CardContent, H2 } from "../ui";

const TagsCard = () => {
  return (
    <Card>
      <CardHeader>
        <H2>Tags</H2>
      </CardHeader>
      <CardContent>
        <TagsIcon />
      </CardContent>
    </Card>
  );
};

export default TagsCard;
