import './App.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import React from 'react';
import Header from './components/Header';
import Cards from './components/Cards';
import Analysis from './components/Analysis';
import Filter from './components/Filter';
import axios from 'axios';
// var stock = import 'assets/stock.csv'

function PriceCard(props) {
  const { title, price } = props;
  return (<Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
          ${price}
      </Card.Text>
    </Card.Body>
 </Card>);
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      layout:[],
      predictedMin:0,
      predictedMax:0,
      currentPrice:0,
      maxDays: 30,
      data:{},
      res: {},
      stock_name:'BTC-USD'
    };
  }
 
  componentDidMount(){
    this.data();
  
  }

  componentWillMount() {
    this.updateData()
  }

  updateData() {
    axios.get(`http://127.0.0.1:8009/getModelResult?name=${this.state.stock_name}`).then(
      res => {
        console.log(res)
        this.setState({
          res: res.data
        });
        this.data(res.data);
      }
    )
  }
  
  data(data) {
    console.log(data)
    if(data!=undefined) {
      let x = data['date'];
      let y = data['price'];
      let current_price = data['currentPrice'];
      x = x.slice(0,this.state.maxDays);
      y = y.slice(0,this.state.maxDays);
      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: 'Predicted Closing Price',
        fill: 'tonexty',
        x: x,
        y: y,
        line: {color: 'rgb(28,32,169)'}
      };

      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'AAPL Low',
        x: 0,
        y: 0,
        line: {color: 'red'}
      };

      var data = [trace1,trace2]; 

      var layout = {
        // title: 'Multiple Trace Filled-Area Animation',
        xaxis: {
          range: [x[0],x[x.length-1]],
          showgrid: false,
        
        },
        yaxis: {
          range: [Math.min.apply(Math, y), Math.max.apply(Math, y)],
          showgrid: true
        },
        legend: {
          orientation: 'h',
          x: 0.5,
          y: 1.2,
          xanchor: 'center'
        },
        
      };

      this.setState({
        data,
        layout,
        predictedMin: Math.min.apply(Math, y),
        predictedMax: Math.max.apply(Math, y),
        currentPrice: current_price
      });

    } ;
    
  }



  filterDays(val) {
    this.setState({
      maxDays: val+1
    })
    this.data(this.state.res)
  }

  selectStock( name,e){
    console.log(name)
    this.setState({
      stock_name:name
    })
    this.updateData()
  }

  render() {
    return (
      <Container className="app-container">
        {/* Header */}
          <Header stock_name={this.state.stock_name} selectStock={this.selectStock.bind(this)}/>
          <hr></hr>
        {/* Header */}
        {/* Cards */}
          <Cards currentPrice={this.state.currentPrice} predictedMin={this.state.predictedMin} predictedMax={this.state.predictedMax} />
          <hr></hr>
        {/*Cards */}
        {/*Analysis */}
          <Analysis data={this.state.data} layout={this.state.layout}/>
        {/*Analysis */}
        {/* filter */}
          <Filter filterDays={this.filterDays.bind(this)}/>
      {/* filter */}
        
        
      </Container>
    );
          }
}

export default App;
