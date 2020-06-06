'use strict';

const e = React.createElement;

class Promo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }
    clicked = (e) => {
        this.setState({expanded: !this.state.expanded});
    }
    render() {
        if (this.state.expanded) {
            return (
                <div style={{textAlign: 'center', width: '90vw', backgroundColor: 'gainsboro'}}>
                    <h2 style={{cursor: 'pointer', userSelect: 'none'}} onClick={this.clicked}>{this.props.title}</h2>
                    <img style={{userSelect: 'text'}} src={'../promos/' + this.props.image}/>
                </div>
            )
        }
        return (
            <div style={{textAlign: 'center', width: '90vw', backgroundColor: 'gainsboro'}}>
                <h2 style={{cursor: 'pointer', userSelect: 'none'}} onClick={this.clicked}>{this.props.title}</h2>
            </div>
        )
    }
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <Promo image={'1.svg'} title={'РОГРО-ВОЛГАРЬ ПСК-12,0'}/>
                <Promo image={'2.svg'} title={'ВОЛГАРЬ-9 КП-9'}/>
                <Promo image={'3.svg'} title={'АУП-18.07-02-1'}/>
                <Promo image={'4.svg'} title={'ОПО-8,5; ОПО-9'}/>
                <Promo image={'5.svg'} title={'ОПО-4,25-01-1'}/>
                <Promo image={'6.svg'} title={'БМ-9,5 (4,5)'}/>
                <Promo image={'8_1.svg'} title={'СГ-15 (15-01)'}/>
                <Promo image={'8_2.svg'} title={'СГ-17 (17-01)'}/>
                <Promo image={'8_3.svg'} title={'СГ-22 (22-01)'}/>
                <Promo image={'9.svg'} title={'ПЧ-11'}/>
                <Promo image={'11.svg'} title={'ТПФ-45-01'}/>
                <Promo image={'12.svg'} title={'РИС-2'}/>
                <Promo image={'13.svg'} title={'ТТЖ-04'}/>
                <Promo image={'14.svg'} title={'ОПО-17.30-02'}/>
                <Promo image={'15.svg'} title={'АУП-18.07.30-01'}/>
            </div>
        )
    }
}

const domContainer = document.querySelector('#container');

ReactDOM.render(e(Content), domContainer);