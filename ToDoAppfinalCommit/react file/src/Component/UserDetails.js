import { Checkbox } from '@material-ui/core'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ToDoApi from '../ApiServices/ToDoApi'

export class UserDetails extends Component {
  constructor(props) {
    super(props)
    
    let userlogtoken=sessionStorage.getItem("userlogtoken")

    this.state = {
      taskid:'',
      taskname: '',
      description: '',
      tasklistArray: [],
      userlog:userlogtoken,
      
     
    }
    this.baseState=this.state
   // this.loadTask=this.loadTask.bind(this)
  }

  changeData=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  componentDidMount(){
    if(this.state.userlog){
      this.loadTask();
  }    
}

loadTask(){
  const email=sessionStorage.getItem("usertoken")
  console.log(email);
  ToDoApi.getToDoList(email)
  .then(res =>{
      if(res.status===200){
         console.log(res.data)
          const data=res.data
          
          if(data!==null && data!=="No List"){
          this.setState({tasklistArray:data})
          console.log(this.tasklistArray)
          }
      }
  })
  .catch(error =>{
      console.log("Error While fetching data")
  })
}

  


  submitData=(e)=>{
    e.preventDefault()
        let email=sessionStorage.getItem("usertoken")
        let task ={
            taskname:this.state.taskname,
            description:this.state.description,
            email:email
        }
        task = JSON.stringify(task);
        ToDoApi.addToDoList(task)
        .then(res => {
            if(res.status===200)
            {
                alert("Task Added Successfully")
                this.loadTask();
                this.setState(this.baseState);
            }
        })
        .catch(error => {
            alert("Task not added something goes wrong");
            console.log(error)
        })


  }

  testcheck(taskid)
  {
    //alert("hahahaha"+taskid);
    //console.log(taskid)

       console.log(taskid);
    ToDoApi.deleteSingleTask(taskid).then(res=>{
      if(res.statusText=="OK"){
        this.setState({
          message:'task deleted successfully'
        });
        alert(this.state.message);
        console.log(this.state.tasklist);
        this.setState({
          tasklistArray:this.state.tasklistArray.filter(tasks=>tasks.taskid!==taskid)
        })
      }
      else{
        this.setState({
          message:'unable to delete task'
        });
        alert(this.state.message);
      }
    })


  }
  deleteTask = (taskid) => {
  //  alert("hahahaha");
    // console.log(taskid);
    // ToDoApi.deleteSingleTask(taskid).then(res=>{
    //   if(res.statusText=="OK"){
    //     this.setState({
    //       message:'task deleted successfully'
    //     });
    //     alert(this.state.message);
    //     console.log(this.state.tasklist);
    //     this.setState({
    //       tasklist:this.state.tasklist.filter(tasks=>tasks.taskid!==taskid)
    //     })
    //   }
    //   else{
    //     this.setState({
    //       message:'unable to delete task'
    //     });
    //     alert(this.state.message);
    //   }
    // })

  }

  editTask(taskid,taskname,description,e){

    //e.preventDefault();
    for(let i=0;i<this.state.tasklistArray.length;i++){
        if(this.state.tasklistArray[i].taskid===taskid){
            console.log(this.state.tasklistArray[i].taskid)
            this.setState({
                taskname:taskname,
                description:description
            })
            break;
        }
    }
    this.editfromlist(taskid);
  }

  editfromlist(taskid){
    ToDoApi.deleteSingleTask(taskid)
    .then(res => {
        let data=res.data
        if(res.status===200){
            if(data==="Deleted"){
                alert("Update Task and Save it ")
            }
        }
    })
    .catch(error =>{
        alert("Problem Occurred Task Not Deleted")
        console.log(error)
    })
}

  changetaskStatus(taskid,e){
  
     // e.preventDefault()
      ToDoApi.changeTaskStatus(taskid)
      .then(res => {
          if(res.status===200){
              alert("Task Completed ")
              this.setState({tasklistArray:this.state.tasklistArray.filter(task => task.status==="Pending"?task.taskid===taskid?task.status="Complete":task.status="Pending":task)})
              this.loadTask();
          }
      })
      .catch(error =>{
          alert("Problem Occurred Task Not Complete")
          console.log(error)
      })

  

  }
  

  render() {
    return (
      <div>
        <NavLink style={{float:'right'}} to="/logout" className="btn btn-primary">Logout</NavLink>
        <br/>
        <center>
        <div className="container"> 
          <form >
            <h2>Add Task to TODO List</h2>
            <div className="form-group">
              <label style={{float:"left"}}>Takname</label>
              <input type="text" name="taskname" value={this.state.taskname} onChange={this.changeData} className="form-control"/>

            </div>
            <div>
            <input type="checkbox" checked="checked"></input>

            </div>
            <div className="form-group">
              <label style={{float:"left"}}>Description</label>
              <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.changeData}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.submitData}>Add Task</button>
          </form>

        </div>
        </center>
        <br/>

        <table>
          <thead>
                        <tr>
                            <th>Check</th>
                            <th>Task Id</th>
                            <th>taskname</th>
                            <th>description</th>
                            <th>status</th>
                            <th>Edit Action</th>
                            <th>Delete Action</th>
                        </tr>

                        </thead>
                        <tbody>
                        {
                          this.state.tasklistArray!=null ?this.state.tasklistArray.map(tasks =>{
                            return<tr key={tasks.taskid}>
                                <td><Checkbox color="primary" checked={tasks.status==='pending'?false:true}
                               onClick={()=>this.changetaskStatus(tasks.taskid)}></Checkbox></td>

                             {/* <td><input type="checkbox"  checked={tasks.status==='pending'?false:true}
                               onClick={()=>this.changetaskStatus(tasks.taskid)}></input></td> */}
                              <td>{tasks.taskid}</td>
                              <td>{tasks.taskname}</td>
                              <td>{tasks.description}</td>
                          <td>{tasks.status}</td>
                          <td><button type="button" className="btn btn-primary" onClick={()=>this.editTask(tasks.taskid,tasks.taskname,tasks.description)}>Edit</button></td>
                          <td><button type="button" className="btn btn-primary" onClick={()=>this.testcheck(tasks.taskid)}>Delete</button></td>
                            </tr>})
                        :null}
                        
 
                       
                        
                        </tbody>
                    </table>

      </div>
    )
  }
}

export default UserDetails
