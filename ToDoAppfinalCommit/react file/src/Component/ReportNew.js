import React, { Component } from 'react'
import ToDoApi from '../ApiServices/ToDoApi';


const margin = {top: 20, right: 20, bottom: 30, left: 40};
export class ReportNew extends Component {
    constructor(props) {
      super(props)
     var admintoken=sessionStorage.getItem("admintoken")
      this.state = {
          reports:[],
          adminlog:admintoken
         
      }
    }
    

    componentDidMount(){
       if(this.state.adminlog){
           var allreport=[]
        ToDoApi.displayReport().then(res=>{
            if(res.statusText===200){
                allreport=res.data
                console.log(allreport)
            }

            
        })}

    }
  render() {
    return (
      <div>
          hello
        
      </div>
    )
  }
}

export default ReportNew
