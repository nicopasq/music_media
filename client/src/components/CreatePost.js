import { Alert, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import "../styles/createPost.css"
import { PostContext } from "./PostContext";


function CreatePost(){
    const {setAllPosts} = useContext(PostContext)
    const [question, setQuestion] = useState('')
    const [postErrors, setPostErrors] = useState([])
    const [postErrorSx, setPostErrorSx] = useState({
        visibility:'hidden'
    })
    const [postSuccessSx, setPostSuccessSx] = useState({
        visibility: 'hidden',
    })

    function handleSubmit(e){
        e.preventDefault()

        fetch(`/posts`, {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({question})
        })
        .then(r => r.json())
        .then(data => {
            if (data.errors){
                setPostErrors(data.errors)
                setPostErrorSx({visibility:"block"})
                setTimeout(() => {setPostErrorSx({visibility:'hidden'})},'3000')
            } else{
                setAllPosts(allPosts => [...allPosts, data])
                setPostSuccessSx({visibility:'block'})
                setTimeout(() => {setPostSuccessSx({visibility:'hidden'})},'3000')
            }
        })
    }
    return (
        <Container id="createPostContainer">
            <div className="pageHead">
                <Alert severity="error" sx={postErrorSx}>
                    {postErrors}
                    <Button variant="standard" onClick={e => setPostErrorSx({visibility:"hidden"})}>X</Button>
                </Alert>
                <Alert severity="success" sx={postSuccessSx} className="postAlert">
                    <Typography> Successfuly created discussion!</Typography>
                    <Button variant="standard" onClick={e => setPostSuccessSx({visibility:"hidden"})}>X</Button>
                </Alert>
                <Typography variant="h1"><u>Start A Discussion</u></Typography>
            </div>
            <Paper elevation={3} id="createContent" sx={{bgcolor:'#DCC48E'}}>
                <form 
                onSubmit={handleSubmit}
                id="createPostForm">
                    <Typography variant="h3"><u>Enter a Discussion Question</u></Typography>
                    <TextField
                        id="filled-multiline-static"
                        label="Discussion Question"
                        multiline
                        sx={{bgcolor:"white", width:'80%', marginLeft:'3vw', borderRadius:'10px'}}
                        rows={3}
                        defaultValue={question}
                        onChange={e => setQuestion(e.target.value)}/>
                    <Button type="Submit" variant="contained">Post Discussion</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default CreatePost;