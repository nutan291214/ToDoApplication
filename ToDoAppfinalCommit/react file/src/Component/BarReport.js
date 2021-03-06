import React, { Component } from 'react';
import BarChart from 'react-bar-chart';
 
const data = [
  {text: 'Man', value: 200}, 
  {text: 'Woman', value: 600} 
];
 
const margin = {top: 20, right: 20, bottom: 30, left: 40};
 
class Example extends Component{
  getInitialState() {
    return { width: 500 };
  }
 
  componentDidMount () {
    window.onresize = () => {
     this.setState({width: 200}); 
    };
  }
 
  handleBarClick(element, id){ 
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }
 
  render() {
    return (
        <div ref='root'>
            <div style={{width: '50%'}}> 
                <BarChart ylabel='Quantity'
                  width={200}
                  height={500}
                  margin={margin}
                  data={data}
                  onBarClick={this.handleBarClick}/>
            </div>
        </div>
    );
  }
}
 
export default Example;