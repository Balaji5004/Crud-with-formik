import React from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { AppStates } from '../Context/AppProvider'


export const fileValidationSchema = yup.object({
  name: yup.string().required("Please fill in student name"),
  batch: yup.string().required("Please fill in student batch").min(5,"Please pass the valid batch"),
  qualification: yup.string().required("Please fill in student qualification"),
  gender: yup.string().required("Please specify your gender")
 })


function AddStudents() {
  const{students, setStudent} = AppStates()

const {handleSubmit,values,handleChange,handleBlur,errors,touched} = useFormik({
  initialValues:{
    name:"",
    batch:"",
    qualification:"",
    gender:""
  },
  validationSchema : fileValidationSchema,
  onSubmit:(newStudents) =>{
    console.log("onsubmit",newStudents)
   createStudent(newStudents)
  }
})




  const history = useHistory()
    // const [name, setName] = useState("")
    // const [batch, setBatch] = useState("")
    // const [gender, setGender] = useState("")
    // const [qualification, setQualification] = useState("") 

const createStudent = async (newStudents) =>{
    // creating object from input states
//     const newStudents = {
//       name:name,
//       batch:batch,
//       qualification:qualification,
//       gender: gender,
// }

const response = await fetch("https://64e45b63c555638029130ed9.mockapi.io/users", {
  method:"POST",
  body:JSON.stringify(newStudents),
  headers :{
    "Content-Type":"application/json"
  },
})
const data = await response.json()
  setStudent([...students, data])
  history.push("/students")
}

  return (
    <Base
    title={"Add New Student"}
    description={"We can able to add new students data here"}
    >
    <div className='input-cols'>
      <form onSubmit={handleSubmit}>
    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Name"
     variant="filled" 
     color="success" focused
     type ="name"
     name='name'
        value = {values.name}
        onChange={handleChange}
        onBlur={handleBlur}
     />

     <div style={{color:'crimson'}}>{touched.name && errors.name ? errors.name : ""}</div>

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter divition" 
    variant="filled" 
    color="success" focused 
    type ="batch"
    name='batch'
        value ={values.batch}
        onChange={handleChange}
        onBlur={handleBlur}
    />

<div style={{color:'crimson'}}>{touched.batch && errors.batch ? errors.batch : ""}</div>

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Gender" 
    variant="filled" 
    color="success" focused 
    type ="gender"
    name='gender'  
    value ={values.gender}
        onChange={handleChange}
        onBlur={handleBlur}
    />

<div style={{color:'crimson'}}> {touched.gender && errors.gender ? errors.gender : ""}</div>

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Qualification" 
    variant="filled" 
    color="success" focused 
    type ="qualification" 
    name='qualification'
    value= {values.qualification}
    onChange={handleChange}
    onBlur={handleBlur}
    />

<div style={{color:'crimson'}}>{touched.qualification && errors.qualification ? errors.qualification : ""}</div>

     <Button variant="contained" color='success'
      type='submit'
     >Add Students</Button>

     </form>  
    </div>
    </Base>
  )
}

export default AddStudents