import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import { Typography } from "@mui/material"

const FridgeCard = ({ fridge }) => {

  return (
    <>
      <Card sx={{ height: "150px" }}>
        <CardActionArea onClick={() => {location.href=`/fridge/${fridge.id}`}} sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%', height: '100%', p: 2 }}>
          <Typography variant="h6" component="div" fontWeight={'bold'}>
            {fridge.name}
          </Typography>
        </CardActionArea>
      </Card>
    </>
  )
}

export default FridgeCard