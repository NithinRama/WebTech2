import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MainApplication from './MainApplication';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {green500, cyan500} from 'material-ui/styles/colors'

const theme = getMuiTheme({
        palette: {
            primary1Color: green500,
            accent1Color: cyan500 
        }
    }
)

class Application extends React.Component<undefined, undefined>
{
    render()
    {
        return (
            <MuiThemeProvider muiTheme = {theme}>
                <MainApplication/>
            </MuiThemeProvider>
        );
    }
}

injectTapEventPlugin();
export default Application;

ReactDOM.render(
  <Application/>,
  document.getElementById("app")
);
