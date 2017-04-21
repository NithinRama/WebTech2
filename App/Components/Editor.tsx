import * as React from 'react'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
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

const profileStyle = {
    fontFamily: "Roboto",
    marginLeft: "20px"
}

class Editor extends React.Component<undefined, EditorState>
{
    constructor()
    {
        super();
        this.state = {posted: false};
        this.sendPost = this.sendPost.bind(this);
    }
    render()
    {
        return (
            <div>
                <div style = {profileStyle}>
                       <h2> Welcome </h2> 
                    <p>
                     <span id = "profile">Gathering Profile info</span>
                    </p>
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
                <Snackbar message = "Posted Succesfully" open = {this.state.posted} autoHideDuration = {2000}/>
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
                let profile = JSON.parse(xhr.responseText);
                document.getElementById("profile").innerHTML = profile["displayName"];
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
        var editor = ace.edit("html");
        let html: string = editor.getValue();
        editor = ace.edit("css");
        let css: string = editor.getValue();
        editor = ace.edit("js");
        let js: string = editor.getValue();
        let component = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/api/postdata");
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                console.log("Succesfully posted");
                component.setState({posted: true});
            }
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("HTML=" + html.replace("\n", "") + "&CSS=" + css.replace("\n", "") + "&JS=" + js.replace("\n", "") + "");
    }
}

interface EditorState
{
    posted: boolean;
}

export default Editor