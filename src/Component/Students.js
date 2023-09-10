import React from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AppStates } from '../Context/AppProvider';

function Students() {
  const { students, setStudent } = AppStates()


  const history = useHistory();
  // delete functionality
  const deleteStudent = async (studId) => {

    const response = await fetch(`https://64e45b63c555638029130ed9.mockapi.io/users/${studId}`, {
      method: "DELETE",
    });

    const data = await response.json()
    if (data) {
      const remainingStudents =
        students.filter((stud, idx) => stud.id !== studId)
      setStudent(remainingStudents)
    }
  }


  return (
    <Base
      title={"Employees List"}
      description={"The page contains all Employees data"}
    >

      <div className='card-container'>

        {students.map((stud, idx) => (

          <Card sx={{
            maxWidth: 250, height: 250, display: "flex", flexDirection: "column",
            alignContent: "space-around", justifyContent: 'center',backgroundColor:"peachpuff"
          }} key={idx}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{color:"green",fontWeight:'bold'}}>
                {stud.name}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Division:  {stud.batch}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Gender: {stud.gender}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Qualification: {stud.qualification}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => { history.push(`/edit/${idx}`) }}>
                <EditIcon /> Edit</Button>

              <Button size="small" onClick={() => deleteStudent(stud.id)} color='error'>
                <DeleteForeverIcon />Delete</Button>
            </CardActions>
          </Card>


        ))}
      </div>

    </Base>
  )
}

export default Students