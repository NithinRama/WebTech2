import * as React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

const frameStyle = {
    width: "100%",
    border: "1px solid #4caf50",
    height: "300px"
}

const cardStyle = {
    margin: "20px"
}

class Post extends React.Component<PostProperty, undefined>
{
    render()
    {
        return(
            <Card style = {cardStyle}>
                <CardHeader title = {this.props.name}/>
                <CardText>
                    <iframe id = {this.props.id} style = {frameStyle}/>
                </CardText>
            </Card>
        )
    }

    componentDidMount()
    {
        let result: any = document.getElementById(this.props.id);
        let doc = "<html>" + "<style>" + this.props.css + "</style>" + "<script>" + this.props.js + "</script>" + this.props.html + "</html>";
        console.log(result);
        result.contentWindow.document.open();
        result.contentWindow.document.write(doc);
        result.contentWindow.document.close();
    }
}

interface PostProperty
{
    html: string;
    css: string;
    js: string;
    name: string;
    id : string;
}


export default Post;