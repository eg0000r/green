'use strict';

const stProduct = {
    border: 'thin gainsboro solid',
    borderRadius: '5pt',
    padding: '15pt',
    textAlign: 'center',
    margin: '5pt',
    backgroundColor: 'whitesmoke',
};

const stLabel = {
    border: 'none',
    textAlign: 'center',
    padding: '15pt',
    margin: '5pt',
    backgroundColor: 'transparent',
    width: '80vw'
};

const stProductActive = {
    //display: 'flex',
    //flexDirection: 'column',
    //flex: '1',
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
    maxHeight: '20vw'
};

const stDescription = {
    width: stImage.width,
    fontSize: '1vw',
    textAlign: 'justify',
    flex: '0 1 auto'
};

const url = 'https://cors-anywhere.herokuapp.com/http://3.124.140.71:8080/products-' + lang;
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
                        <span onClick={() => {this.setState({more: !this.state.more})}} style={{cursor: 'pointer'}}>▲</span>
                    </p>
                    <div dangerouslySetInnerHTML={{__html: this.props.table}}/>
                    <p dangerouslySetInnerHTML={{__html: this.props.price}}/>
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
                    <span onClick={() => {this.setState({more: !this.state.more})}} style={{cursor: 'pointer'}}>▼</span>
                </p>
            </div>
        )
    }
}

class ParentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }
    render() {
        if (this.state.expanded) {
            return(
                <div>
                    <h1>{this.props.label}</h1>
                    <div style={{display: 'flex', alignItems: 'stretch', justifyContent: 'center', font: '1.5vw sans-serif', flexWrap: 'wrap'}}>
                        {this.props.content}
                    </div>
                    <button onClick={() => {this.setState({expanded: false})}}>СВЕРНУТЬ</button>
                </div>
                );
        }
        return(
            <div>
                <h1>{this.props.label}</h1>
                <button onClick={() => {this.setState({expanded: true})}}>ПОКАЗАТЬ</button>
            </div>
        );
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
        let temp = [];
        let i;
        let houses = true;
        for (i = 0; i < this.state.content.length; i ++) {
            if (houses && this.state.content[i]['type'] === 2) {
                houses = false;
                out.push(<ParentContainer key={-1} label={'Теплицы'} content={temp}/>);
                temp = [];
            }
            temp.push(
                <Product key={i} name={this.state.content[i]['name']} image={this.state.content[i]['image']} description={this.state.content[i]['description']} table={this.state.content[i]['table']} price={this.state.content[i]['price']}/>
            )
        }
        out.push(<ParentContainer key={-2} label={'С/Х техника'} content={temp}/>);
        return out;
    };
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                {this.loadContent()}
            </div>
        );
    }
}

const domContainer = document.querySelector('#container');

ReactDOM.render(e(Content), domContainer);
