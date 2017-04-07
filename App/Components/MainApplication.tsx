import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

class MainApplication extends React.Component<undefined, undefined>
{   
    render()
    {
        const appButton = <RaisedButton label = "Sign in" secondary = {true} icon = {<FontIcon className = "fa fa-sign-in"/>} />;

        return (
            <div>
                <AppBar title = "CodeGram" iconElementRight = {appButton}/>
            </div>
        );
    }
}

export default MainApplication;