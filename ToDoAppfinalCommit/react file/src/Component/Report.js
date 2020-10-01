import React, { Component } from 'react'
import { NavLink } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'
import { Redirect } from 'react-router'


import ToDoApi from '../ApiServices/ToDoApi'

export class Report extends Component {
    constructor(props) {
        super(props)

        let admintoken = sessionStorage.getItem("admintoken")
        this.state = {
            reports: {},
            adminlog: admintoken
        }
    }

    componentDidMount() {
        if(this.state.adminlog){
        let allreport = []
        ToDoApi.displayReport()
            .then(res => {
                if (res.status === 200) {
                    allreport = res.data
                    console.log(allreport)
                }
                let data = {
                    labels: ['Active Users', 'New Users', 'Total Task'],
                    datasets: [
                        {
                            label: 'Total Activity in Last 7 Days',
                            data: allreport,
                            borderColor: ['rgba(159,80,200,0.4)', 'rgba(199,20,125,0.4)', 'rgba(36,154,210,0.4)'],
                            backgroundColor: ['rgba(0,128,0,0.7)', 'rgba(255,0,0,0.7)', 'rgba(0,0,128,0.7)'],
                            
                        }
                    ]
                }

                this.setState({ reports: data })
            })
            .catch(error => {
                alert("Something Wrong")
                console.log(error)
            })
        }
        
    }
    option = {
        title: {
            display: true,
            text: 'Report'
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero:true,
                        stepSize: 1,
                    },
                    
                }
            ]
            
        },
      
    }

    back=()=>{
        this.props.history.push('/admin');

    }
    logout=()=>{
        this.props.history.push('/logout');
    }

  render() {
      if(this.state.adminlog){
    return (
        <div>
            <center><h1>Report</h1></center>
            
                <button className="btn btn-primary" onClick={this.logout} style={{float:'right'}}>Logout</button>
                <button className="btn btn-primary" style={{float:'right'}}onClick={this.back}>Back</button>



            

               <div className="container">
        <Bar data={this.state.reports} options={this.option}  />
    </div>
    </div>
    
    )
  }
  else{
      return<Redirect to="/"></Redirect>
  }
}
}

export default Report
