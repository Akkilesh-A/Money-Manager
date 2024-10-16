import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, Badge, CardFooter, Button } from './ui'
import { userDataSliceFields } from '../app/features/userData/userDataSlice'
import { ArrowRight } from 'lucide-react'

const UserTagsCard = () => {

    const tags=useSelector((state:{userData:userDataSliceFields})=>state.userData.tags)

  return (
    <Card>
        <CardHeader>
            Top Tags
        </CardHeader>
        <CardContent className='flex gap-4 flex-wrap'>
            {tags.map((tag,index)=>{
               return(
                <Badge className={`p-2 `} key={index}>
                 {tag}
               </Badge> 
               )
            })}
        </CardContent>
        <CardFooter className='flex justify-end'>
            <Button>View All Tags <ArrowRight size={"small"} /> </Button>
        </CardFooter>
    </Card>
  )
}

export default UserTagsCard