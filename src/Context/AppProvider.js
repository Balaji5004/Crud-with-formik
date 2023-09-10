import React, {createContext, useContext, useEffect, useState } from 'react'


const StudentCtx = createContext(null)

function AppProvider({children}) {
    const [students, setStudent] = useState([])
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
    
  
    useEffect (() => {
      const getstudent = async() => {
         const response = await fetch("https://64e45b63c555638029130ed9.mockapi.io/users",{
          method:"GET"
         })
         const data = await response.json();
         if(data){
          setStudent(data)
         }
      }
      getstudent();
    },[])

  return (
    <div>
        <StudentCtx.Provider
        value={{students,setStudent,name,setName,batch,setBatch,gender,setGender,qualification,setQualification}}
        >
           {children}
        </StudentCtx.Provider>
    </div>
  )
}

export const AppStates = () => {
    return useContext(StudentCtx)
}

export default AppProvider