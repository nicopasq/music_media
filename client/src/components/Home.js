import { Container, Typography } from "@mui/material";
import React from "react";
import DiscussionPost from "./DiscussionPost";
import '../styles/home.css'


function Home({allPosts, displayMessage}){

    const discussionPostJSX = allPosts.map(post => {
        return (<DiscussionPost post={post} key={post.id}/>)
    })
    
    const noDiscussions = <Typography variant="h3" className="noDiscussions">{displayMessage}</Typography>
    const renderPosts = discussionPostJSX.length > 0 ? discussionPostJSX : noDiscussions

    return (
        <Container id="homeContainer">
            <div id="pageHead">
                <Typography variant="h1"><u>Explore Discussions</u></Typography>
            </div>
            <div id="homeContent">
                <ul style={{listStyle:'none'}}>
                    {renderPosts}
                </ul>
            </div>
        </Container>
    )
}


export default Home;