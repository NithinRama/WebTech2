import * as React from 'react'
import Post from './Post'

const samplePost = {
    html: "<body><h1>body</h1><button onclick = 'send()'>click me</button></body>",
    js: "function send(){alert('hi')}"
}
class Posts extends React.Component<undefined, undefined>
{
    render()
    {
        return(
            <Post html = {samplePost.html} js = {samplePost.js} css = "" name = "Names" id = "1"/>
        )
    }
}

export default Posts;
