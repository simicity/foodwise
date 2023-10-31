import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import { Typography } from "@mui/material"

const FridgeCard = ({ fridge }) => {

  return (
    <>
      <Card sx={{ height: "150px", p: 2 }}>
        <CardActionArea href={`/fridge/${fridge.id}`}>
          <Typography variant="h6" component="div" fontWeight={'bold'}>
            {fridge.name}
          </Typography>
        </CardActionArea>
      </Card>
    </>
  )
}

export default FridgeCard