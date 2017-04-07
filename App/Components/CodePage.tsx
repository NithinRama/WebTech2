import * as React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs'

class CodePage extends React.Component<undefined, undefined>
{
    render()
    {
        return(
            <Tabs>
                <Tab label = "CODE">
                    <div> Here you code </div>
                </Tab>
                <Tab label = "FEED">
                    <div> Here you see posts </div>
                </Tab>
            </Tabs>
        )
    }
}

export default CodePage;