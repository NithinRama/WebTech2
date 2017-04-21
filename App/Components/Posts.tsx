import * as React from 'react'
import Post from './Post'

const samplePost = {
    html: "<body><h1>body</h1><button onclick = 'send()'>click me</button></body>",
    js: "function send(){alert('hi')}"
}
class Posts extends React.Component<undefined, any>
{

    constructor()
    {
        super();
        this.state = {friends: []};
    }

    render()
    {
        let posts = undefined;
        let postsArray: any[] = [];
        console.log(JSON.stringify(this.state.friends) + " from render");
        let flen = this.state.friends.length;
        let friends = this.state.friends;
        for(let j = 0; j < flen; j++)
        {
            if(friends[j] != null)
            {
                let plen = friends[j]["posts"].length;
                let posts = friends[j]["posts"];
                for(let k = 0; k < plen; k++)
                {
                    console.log(JSON.stringify(posts[k]));
                    postsArray.push(<Post html = {posts[k]["html"]} js = {posts[k]["js"]} css = {posts[k]["css"]} name = {friends[j]["name"]} id = {friends[j]["name"] + k}/>)
                }
            }
        }
        return(
            <div>
                {postsArray}
            </div>
        )
    }

    componentDidMount()
    {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/api/fb/friendsposts");
        let component = this;
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                let posts = JSON.parse(xhr.responseText);
                console.log(JSON.stringify(posts));
                component.setState({friends: posts});
            }
        }
        xhr.send();
    }
}

export default Posts;

