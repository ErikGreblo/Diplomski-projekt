import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
export default function Student() {
    const paperStyle = {padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const student = {name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
            method:"POST", 
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New student added.")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result)
        })
    },[])

  return (
    <Container>
    <Paper elevation={3} style={paperStyle}>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1} }}
      noValidate
      autoComplete="off"
    >
        <h1><u>Add Student</u></h1>
      <TextField id="standard-basic" label="Student name" variant="standard" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="standard-basic" label="Student address" variant="standard" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
    <Button variant="contained" onClick={handleClick}>Save student</Button>


    </Box>
    </Paper>
    <Paper elevation={3} style={paperStyle}>
        {students.map(student=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={student.id}>
                Id:{student.id} <br/>
                Name:{student.name} <br/>
                Address:{student.address}

 
            </Paper>
        ))}
    </Paper>
    </Container>
  );
}
