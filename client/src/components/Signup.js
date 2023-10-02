import { Alert, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom"

function Signup(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState([])
    const [alertSx, setAlertSx] = useState({visibility:"hidden"})
    const [currentUser, setCurrentUser] = useState({})

const boxSX = {
    width: '50%',
    position: 'relative',
    top: '20vh',
    left: '22%',
    // border: '1px solid black'
}

const loginFormStyle= {
    // border: '1px solid orange',
    width: 'fit-content',
    position: 'relative',
    left: '11vw'
}

const inputStyle = {
    marginTop: '2vh',
    
}

const submitBtnStyle = {
    margin: "2vw", 
    width:'100%', 
    position: "relative", 
    right: "2vw"
}

function createUser(e){
    e.preventDefault();

    fetch(`/users`, {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({username, password})
    })
    .then( (r) => {
        if(r.ok){
            r.json().then((r) => {
                console.log(r)
                setCurrentUser(r)})
        } else {
            r.json().then((r) => setAlertMessage(r.errors))
            setAlertSx({visibility:"block"})
        }
    })
}

    return (
        <Container>
            <Alert severity="error" sx={alertSx}>
                Can not Sign up: {alertMessage.map(e => e + ", ")}
                <Button onClick={() => setAlertSx({visibility:"hidden"})}>X</Button>
            </Alert>
            <Box sx={boxSX}>
            <Typography sx={{
                position: 'relative',
                left: '40%'}}
                variant="h4">Sign Up</Typography>

            <form  
            id="loginForm"
            onSubmit={(e) => createUser(e)}
            style={loginFormStyle}>
                    <Grid item xs={4} sx={inputStyle}>
                        <TextField
                        id="username"
                        sx={{scale:"1.3"}} 
                        variant="standard"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}/>
                    </Grid>
                    <Grid item xs={4} sx={inputStyle}>
                        <TextField 
                        id="password"
                        sx={{scale:"1.3"}} 
                        variant="standard" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}/>
                    </Grid>
                <Button 
                sx={submitBtnStyle} 
                variant="contained"
                type="Submit">Sign Up!</Button>
            </form>
            <Link to = '/login'>
                <Typography sx={{position:'relative', left:'12.25vw'}} variant="button">Back to Login</Typography>
            </Link>

            </Box>
        </Container>
    )
}

export default Signup;