import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import FridgeCard from "../components/FridgeCard"
import AddFridgeCard from "../components/AddFridgeCard"
import { API_URL } from "../main"

const Dashboard = () => {
  const [fridges, setFridges] = useState([])
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    const fetchFridges = async () => {
      if(user === null || user.id === undefined) return
      const response = await fetch(`${API_URL}/api/fridges-users/fridges/${user.id}}`)
      const data = await response.json()
      setFridges(data)
    }

    fetchFridges()
  }, [user])

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