import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import HomePage from './HomePage'
import CodePage from './CodePage'

class MainApplication extends React.Component<undefined, MainApplicationState>
{   
    constructor()
    {
        super();
        this.state = {isLoggedIn: false};
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    render()
    {
        let appButton = !this.state.isLoggedIn ? <RaisedButton label = "Sign in" secondary = {true} icon = {<FontIcon className = "fa fa-sign-in"/>} onTouchTap = {this.signIn}/> : <RaisedButton label = "Sign out" secondary = {true} icon = {<FontIcon className = "fa fa-sign-out"/>} onTouchTap = {this.signOut}/> 

        return (
            <div>
                <AppBar title = "CodeGram" iconElementRight = {appButton} zDepth = {this.state.isLoggedIn ? 0 : 1}/>
                {this.state.isLoggedIn ? <CodePage/> : <HomePage/>}
            </div>
        );
    }

    componentDidMount()
    {
        let xhr = new XMLHttpRequest();;
        xhr.open("GET", "http://localhost:3000/api/sess");
        let element = this;
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                let response = JSON.parse(xhr.responseText);
                if(response["session"])
                   element.setState({isLoggedIn: true}); 
            }
        }
        xhr.send();
    }

    signIn()
    {
        window.location.replace("http://localhost:3000/api/auth/fb");
    }

    signOut()
    {
        this.setState({isLoggedIn: false});
    }
}

export default MainApplication;

interface MainApplicationState
{
    isLoggedIn: boolean;
}