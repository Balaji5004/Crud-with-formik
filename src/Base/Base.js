import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useHistory } from 'react-router-dom'

const Base = ({ title, description, children }) => {
  const history = useHistory();
  return (
    <div className='main-component base-component'>
     <AppBar position="static">
      <Toolbar>
      <div className='nav-bar'>
        <Button color="inherit"
          onClick={() => history.push("/")}
        >Dashboard</Button>

        <Button color="inherit"
          onClick={() => history.push("/students")}
        >Employees-List</Button>

        <Button color="inherit"
          onClick={() => history.push("/add")}
        >Add-Employee</Button>
      </div>
      </Toolbar>
      </AppBar>

      <header>
        <Typography variant="h2" className='heading'>
          {title}
        </Typography>
      </header>
      <main className='main-segment'>
        <Typography variant="h4" className='heading'>
          {description}
        </Typography>
        <div className='child-component'>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Base