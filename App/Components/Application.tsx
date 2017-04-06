import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import HomePage from './HomePage.tsx';

class Application extends React.Component<undefined, undefined>
{
    render()
    {
        console.log("inside render");
        return (
            <MuiThemeProvider>
                <div> Hello World </div>
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
