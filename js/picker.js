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

const url = 'https://cors-anywhere.herokuapp.com/http://35.158.250.185:8080/products-' + lang;
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
    componentDidMount = () => {
        console.log(this.props.content);
    };
    render() {
        if (this.state.expanded) {
            return(
                <div>
                    <button style={{border: 'solid black thin', borderRadius: '15pt', backgroundColor: 'transparent', outline: 'none', marginTop: '15pt'}} onClick={() => {this.setState({expanded: false}); this.props.callback()}}>◄ Назад</button>
                    <h1>{this.props.label}</h1>
                    <div style={{display: 'flex', alignItems: 'stretch', justifyContent: 'center', font: '1.5vw sans-serif', flexWrap: 'wrap'}}>
                        {this.props.content}
                    </div>
                </div>
                );
        }
        return(
            <div onClick={() => {this.setState({expanded: true}); this.props.callback()}} style={stProduct}>
                <h3 style={{width: stImage.width}}>{this.props.label}</h3>
                <img style={stImage} src={this.props.image}/>
            </div>
        );
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            greenVisible: true,
            machineryVisible: true
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
    hideGreenhouses = () => {
        this.setState({greenVisible: false});
    };
    showGreenhouses = () => {
        this.setState({greenVisible: true});
    };
    hideMachinery = () => {
        this.setState({machineryVisible: false});
    };
    showMachinery = () => {
        this.setState({machineryVisible: true});
    };
    loadContent = () => {
        let out = [];
        let temp = [];
        let i;
        let houses = true;
        for (i = 0; i < this.state.content.length; i ++) {
            if (houses && this.state.content[i]['type'] === 2) {
                houses = false;
                if (this.state.greenVisible && this.state.machineryVisible) {
                    out.push(<ParentContainer callback={this.hideMachinery} key={-1} id={-1} label={'Теплицы'} content={temp} image={'https://i.imgur.com/TPgkI0j.png'}/>);
                } else if (this.state.greenVisible && !this.state.machineryVisible) {
                    out.push(<ParentContainer callback={this.showMachinery} key={-1} id={-1} label={'Теплицы'} content={temp} image={'https://i.imgur.com/TPgkI0j.png'}/>);
                }
                temp = [];
            }
            temp.push(
                <Product key={i} name={this.state.content[i]['name']} image={this.state.content[i]['image']} description={this.state.content[i]['description']} table={this.state.content[i]['table']} price={this.state.content[i]['price']}/>
            )
        }
        if (this.state.machineryVisible && this.state.greenVisible) {
            out.push(<ParentContainer callback={this.hideGreenhouses} key={-2} id={-2} label={'С/Х техника'} content={temp} image={'https://i.imgur.com/9GXzrBb.png'}/>);
        } else if (this.state.machineryVisible && !this.state.greenVisible) {
            out.push(<ParentContainer callback={this.showGreenhouses} key={-2} id={-2} label={'С/Х техника'} content={temp} image={'https://i.imgur.com/9GXzrBb.png'}/>);
        }
        return out;
    };
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'flex', alignItems: 'stretch', justifyContent: 'center', font: '1.5vw sans-serif', flexWrap: 'wrap'}}>
                    {this.loadContent()}
                </div>
            </div>
        );
    }
}

const domContainer = document.querySelector('#container');

ReactDOM.render(e(Content), domContainer);
