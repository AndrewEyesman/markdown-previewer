import React from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'
import Parser from 'html-react-parser'
import 'normalize.css'
import './styles/styles.scss'
import markup from './markup'

marked.setOptions({
    gfm: true,
    breaks: true
})

class MarkdownPreviewer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            input: markup
        }
    }

    getInput = (e) => {
        const input = e.target.value
        this.setState(() => ({
            input
        }))
    }

    render() {
        return (
            <div className="wrapper">
                <Editor output={this.state.input} getInput={this.getInput} />
                <Previewer output={this.state.input} />
            </div>
        )
    }
}

const Editor = (props) => (
    <div className="box">
        <BoxHeader title="Editor" />
        <textarea 
            id="editor" 
            onChange={props.getInput}
            defaultValue={props.output}
        >
        </textarea>
    </div>
)

const Previewer = (props) => (
    <div className="box">
        <BoxHeader title="Previewer" />
        <div 
            id="preview" 
            dangerouslySetInnerHTML={{__html: marked(props.output)}}
        />
    </div>
)

const BoxHeader = (props) => (
    <div className="box-header">
        <div>{props.title}</div>
    </div>
)

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('root'))