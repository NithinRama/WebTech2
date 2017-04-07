import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import HomePage from './HomePage'

class MainApplication extends React.Component<undefined, undefined>
{   
    render()
    {
        const appButton = <RaisedButton label = "Sign in" secondary = {true} icon = {<FontIcon className = "fa fa-sign-in"/>} />;

        return (
            <div>
                <AppBar title = "CodeGram" iconElementRight = {appButton}/>
                <HomePage/>
            </div>
        );
    }
}

export default MainApplication;