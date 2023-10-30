import { Box } from "@mui/system"
import { Typography } from "@mui/material"

const ErrorPage = () => {

  return (
    <>
      <Box style={{
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <Typography variant="h4" component="h1">Oops!</Typography>
        <Typography variant="subtitle1" component="p" mt={2}>Something went wrong...</Typography>
      </Box>
    </>
  )
}

export default ErrorPage