import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Header = () => {

  return (
    <>
      <Box component="img" src="/fridge.png" mr={2} sx={{ width: 25 }} />
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold", color: (theme) => theme.palette.text.primary }}>
        Foodwise
      </Typography>
    </>
  )
}

export default Header