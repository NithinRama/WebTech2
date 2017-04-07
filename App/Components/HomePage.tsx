import * as React from 'react';
import {Card, CardHeader, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

const cardStyle = {
    margin: 30
}
const buttonStyle = {
    margin: "10px",
    width: "100%"
}
const cardTextStyle = {
    borderLeft: "2px solid #4caf50",
    margin: "10px",
    backgroundColor: "#eeeeee"
}

class HomePage extends React.Component<undefined, undefined>
{
    render()
    {
        return (
            <Card style = {cardStyle}>
                <CardMedia overlay = {<CardTitle title = "Code HTML, CSS and JS" subtitle = "Share your front end skills"/>}>
                    <img src = "./images/logo.png" height = "500px"/>
                </CardMedia>
                <CardTitle title = "Create Snippets"/>
                <CardText style = {cardTextStyle}>
                    Sign in and create front end templates using any front end frameworks wiht HTML, CSS, JS and see them render. Add explanation about your code and share. We have three editors for HTML, CSS and JS. Each component can be edited and see it render in the same page.
                </CardText>
                <CardTitle title = "Live feed"/>
                <CardText style = {cardTextStyle}>
                    See live feed which will have new renders and like and comment and see it's explanation to learn more.
                </CardText>
                <RaisedButton label = "Start with facebook" icon = {<FontIcon className = "fa fa-facebook"/>} secondary = {true} style = {buttonStyle}/>
            </Card>
        );
    }
}

export default HomePage;