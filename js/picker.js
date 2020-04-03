'use strict';

const stProduct = {
    border: 'thin gainsboro solid',
    borderRadius: '5pt',
    padding: '15pt',
    textAlign: 'center',
    margin: '5pt',
    backgroundColor: 'whitesmoke'
};

const stProductActive = {
    border: 'thin gainsboro solid',
    borderRadius: '5pt',
    padding: '15pt',
    textAlign: 'center',
    margin: '5pt',
    backgroundColor: 'whitesmoke',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
};

const stMore = {
    width: '5vw',
    height: '5vw',
    borderRadius: '50%',
    fontSize: '1.5vw',
    color: 'black',
    verticalAlign: 'middle',
    display: 'table-cell',
    userSelect: 'none',
    cursor: 'pointer'
};

const stImage = {
    width: '30vw',
    height: '20vw'
};

const stDescription = {
    width: stImage.width,
    fontSize: '1vw',
    textAlign: 'justify'
};

const url = 'http://157.230.242.35:8080/products-' + lang;
const e = React.createElement;

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            more: false
        };
    }
    render() {
        if (this.state.more) {
            return (
                <div style={stProductActive}>
                    <h3 style={{width: stImage.width}}>{this.props.name}</h3>
                    <img style={stImage} src={this.props.image}/>
                    <p style={stDescription}>
                        {this.props.description}
                    </p>
                    <p onClick={() => {this.setState({more: !this.state.more})}} style={{textAlign: 'center', cursor: 'pointer'}}>▲</p>
                </div>
            )
        }
        return (
            <div style={stProduct}>
                <h3 style={{width: stImage.width}}>{this.props.name}</h3>
                <img style={stImage} src={this.props.image}/>
                <p style={stDescription}>
                    {this.props.description.substr(0, 100)}
                    <span style={{
                        color: 'transparent',
                        textShadow: '0 0 1px #000'
                    }}>{this.props.description.substr(100, 5)}</span>
                    <span style={{
                        color: 'transparent',
                        textShadow: '0 0 1.5px #000'
                    }}>{this.props.description.substr(105, 5)}</span>
                    <span style={{
                        color: 'transparent',
                        textShadow: '0 0 2px #000'
                    }}>{this.props.description.substr(110, 5)}</span>
                    <span style={{
                        color: 'transparent',
                        textShadow: '0 0 2.5px #000'
                    }}>{this.props.description.substr(115, 5)}</span>
                    <span style={{
                        color: 'transparent',
                        textShadow: '0 0 3px #000'
                    }}>{this.props.description.substr(120, 5)}</span>
                    <span style={{
                        color: 'transparent',
                        textShadow: '0 0 4px #000'
                    }}>{this.props.description.substr(125, 4)}</span>
                </p>
                <p onClick={() => {this.setState({more: !this.state.more})}} style={{textAlign: 'center', cursor: 'pointer'}}>▼</p>
            </div>
        )
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
    }
    componentDidMount = () => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            this.setState({content: JSON.parse(xhr.responseText)});
        });
        xhr.open('GET', url);
        xhr.send();
    };
    loadContent = () => {
        let out = [];
        let i;
        for (i = 0; i < this.state.content.length; i ++) {
            out.push(
                <Product key={i} name={this.state.content[i]['name']} image={this.state.content[i]['image']} description={this.state.content[i]['description']}/>
            )
        }
        return out;
    };
    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', font: '1.5vw sans-serif', flexFlow: 'row wrap'}}>
                {this.loadContent()}
            </div>
        );
    }
}

const domContainer = document.querySelector('#container');

ReactDOM.render(e(Content), domContainer);