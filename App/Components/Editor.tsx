import * as React from 'react'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'

declare var ace: any;

const codeStyle = {
    width: "32%",
    height: "450px",
    display: "inline-block",
    marginLeft: "1%"
}

const headingStyle = {
    width: "30%",
    marginRight: "1%",
    marginLeft: "1%",
    display: "inline-block",
    fontFamily: "Roboto"
}

const resultStyle = {
    width: "90%",
    marginLeft: "4%",
    border: "1px solid #4caf50",
    height: "450px"
}

const buttonStyle = {
    margin: "5px",
    width: "90%",
    marginLeft: "4%"
}

class Editor extends React.Component<undefined, undefined>
{
    render()
    {
        return (
            <div>
                <div>
                    <p id = "gathering profile info..."/>
                </div>
                 <h1 style = {headingStyle}>HTML <span><FontIcon className = "fa fa-html5"/> </span></h1>
                    <h1 style = {headingStyle}>CSS <span><FontIcon className = "fa fa-css3"/></span></h1>
                    <h1 style = {headingStyle}>JS <span><FontIcon className = "fa fa-code"/></span></h1>
                    <div style = {codeStyle} id = "html"></div>
                    <div style = {codeStyle} id = "css"></div>
                    <div style = {codeStyle} id = "js"></div>
                    <RaisedButton label = "Test" icon = {<FontIcon className = "fa fa-eye"/>} secondary = {true} style = {buttonStyle} onTouchTap = {this.changeContents} href = "#result"/>
                    <h1 style = {headingStyle}>Result</h1>
                    <iframe id = "result" style = {resultStyle}></iframe>
                    <RaisedButton label = "Post" icon = {<FontIcon className = "fa fa-share-square"/>} secondary = {true} style = {buttonStyle} onTouchTap = {this.sendPost}/>
            </div>
        )
    }

    componentDidMount()
    {
        var editor = ace.edit("js");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");
        
        editor = ace.edit("css");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/css");
        editor.setValue("");

        editor = ace.edit("html");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/html");
        editor.setValue("<body>\n</body>");

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/api/getprofile")
        xhr.onreadystatechange = function()
        {
            if(xhr.status == 200 && xhr.readyState == 4)
            {
                console.log(xhr.responseText);
            }
        }
        xhr.send();
    }

    changeContents()
    {
        var editor = ace.edit("html");
        let html = editor.getValue();
        editor = ace.edit("css");
        let css = editor.getValue();
        editor = ace.edit("js");
        let js = editor.getValue();
        let result: any;
        result = document.getElementById("result");
        let source = "<html>" + "<script>" + js + "</script>" + "<style>" + css + "</style>" + html + "</html>";
        console.log(source);
        result.contentWindow.document.open();
        result.contentWindow.document.write(source);
        result.contentWindow.document.close();
    }

    sendPost()
    {
        
    }
}

export default Editor