import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { AppStates } from '../Context/AppProvider';
import { fileValidationSchema } from './Addstudents';
import { useFormik } from 'formik';


function UpdateStudents() {
  const{students, setStudent,name,setName,gender,setGender,batch,setBatch,qualification,setQualification} = AppStates()

  const {id} = useParams();
     const editStudent = students[id]
    
    const history = useHistory();
 
 

   const {handleSubmit,values,handleChange,errors} = useFormik({
    initialValues: editStudent,
   
    validationSchema : fileValidationSchema,
    onSubmit :(updatedObject) => {
         console.log("onSubmit",updatedObject)
         updateStudent(updatedObject)
    }
   })

    useEffect(()=>{
       setName(editStudent?.name)
       setBatch(editStudent?.batch)
       setGender(editStudent?.gender)
       setQualification(editStudent?.qualification)
       console.log(editStudent)
    }, [editStudent,setBatch,setName,setGender,setQualification,name,batch,gender,qualification])
  


    async function updateStudent (updatedObject){
        //  const updatedObject = {
        //     name : name,
        //     batch : batch,
        //     gender: gender,
        //     qualification :qualification
        //  }
     const response = await fetch(`https://64e45b63c555638029130ed9.mockapi.io/users/${editStudent.id}`, {
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const data = await response.json()
     if(data){
         console.log(updatedObject)
         students[id] = updatedObject
         setStudent ([...students])
         history.push("/students")
     }
    }

  return (
    <Base
    title={"Edit a Student"}
    description={"Edit Stuudents data here"}
    >
    <div className='input-cols'>

      <form onSubmit={handleSubmit}>

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Name"
    variant="filled"
    color="warning" focused
     type ="name"
     name='name'
        value = {values.name}
        onChange={handleChange}
     />

    <div style={{color:"crimson"}}> {errors.name ? errors.name : ""} </div>

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter divition" 
    variant="filled"
  color="warning" focused 
    type ="batch"
    name='batch'
        value ={values.batch}
        onChange={handleChange}
    />

<div style={{color:"crimson"}}> {errors.batch ? errors.batch : ""}  </div>

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Gender" 
    variant="filled"
  color="warning" focused 
    type ="gender"  
    name='gender'
    value = {values.gender}
        onChange={handleChange}
    />

<div style={{color:"crimson"}}>{errors.gender ? errors.gender : ""}  </div>

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Qualification" 
    variant="filled"
  color="warning" focused 
    type ="qualification" 
    name='qualification'
    value= {values.qualification}
    onChange={handleChange}
    />

<div style={{color:"crimson"}}> {errors.qualification ? errors.qualification : ""}  </div>

     <Button variant="contained" color='warning'
      type='submit'
     >Update Students</Button>

      </form>

    </div>
</Base>
  )
}

export default UpdateStudents