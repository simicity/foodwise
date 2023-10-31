import { useState } from "react"
import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import FridgeCard from "../components/FridgeCard"
import AddFridgeCard from "../components/AddFridgeCard"

const Dashboard = () => {
  const [fridges, setFridges] = useState([{id: 1, name:"Fridge 1"}, {id: 2, name:"Fridge 2"}]); // TODO: dummy data for UI testing; get fridge data from API

  return (
    <>
      <Typography variant="h4" component="div" fontWeight={"bold"} mb={3}>Dashboard</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <AddFridgeCard />
          </Grid>
          {fridges && fridges.length > 0 && (
            fridges.map((fridge) => (
              <Grid item key={fridge.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <FridgeCard fridge={fridge} />
              </Grid>
          )))}
        </Grid>
    </>
  )
}

export default Dashboard