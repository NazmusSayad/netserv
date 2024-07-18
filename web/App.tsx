import { Button, Typography } from '@mui/material'

const SimpleComponent = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome to My Simple Component
      </Typography>
      <Typography variant="body1" paragraph>
        This is a basic example of a Material-UI component.
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </>
  )
}

export default SimpleComponent
