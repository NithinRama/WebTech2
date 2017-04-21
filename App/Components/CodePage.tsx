import * as React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import Editor from './Editor'
import Posts from './Posts'

class CodePage extends React.Component<undefined, undefined>
{
    render()
    {
        return(
            <Tabs>
                <Tab label = "CODE">
                    <Editor/>
                </Tab>
                <Tab label = "FEED">
                    <Posts/>
                </Tab>
            </Tabs>
        )
    }

}

export default CodePage;