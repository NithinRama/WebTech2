import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import HomePage from './HomePage'

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
                <AppBar title = "CodeGram" iconElementRight = {appButton} zDepth = {this.state.isLoggedIn ? 0 : 2}/>
                {this.state.isLoggedIn ? <CodePage/> : <HomePage/>}
            </div>
        );
    }

    signIn()
    {
        this.setState({isLoggedIn: true});
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