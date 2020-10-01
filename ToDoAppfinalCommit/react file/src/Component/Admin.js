import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ToDoApi from '../ApiServices/ToDoApi'

export class Admin extends Component {
  constructor(props) {
    super(props)
    let admintoken = sessionStorage.getItem("admintoken")
 
    this.state = {
       message:'',
       users:[],
       adminlog:admintoken
    }
  }

  loadUser(){

    ToDoApi.getAllUser().then((res)=>{
       console.log(res.data)
       
       this.setState({users:res.data})

    })

  }

  activateUser(email,password,e){
    let idpass={
      email:email,
      password:password
    }

    ToDoApi.activateUser(JSON.stringify(idpass)).then(res=>{
      if(res.data==="User Activation Successfull"){
        alert(res.data)
        this.loadUser();
        this.setState({users:this.state.users.filter(user =>user.status==="Deactivated"?user.email===email?user.status="Active":user.status="Deactivated":user)})
    }
})
.catch(error =>{
    alert("Something Wrong")
    console.log(error)
})

  }

  deactivateuser(email,password,e){
    let idpass={
      email:email,
      password:password
    }

    ToDoApi.deactivateUser(idpass).then(res=>{ if(res.status===200){
      alert(res.data)
      this.loadUser();
      this.setState({users:this.state.users.filter(user =>user.status==="Active"?user.email===email?user.status="Deactivated":user.status==="Active":user)})
  }

    }).catch(error =>{
      console.log(error)
      alert("Something Wrong")
  })

  }

  componentDidMount(){
    if(this.state.adminlog){
    this.loadUser();
    }
  }
  
  render() {
    return (
      <div>
        <center><h1>Admin Page</h1></center>
        <NavLink to="/logout" className="btn btn-primary" style={{float:"right"}}>Logout</NavLink>
        <NavLink to="/report" className="btn btn-primary"style={{float:"right",marginLeft:15}}>Report</NavLink>
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Status</th>
              <th>Activate</th>
              <th>Deactivate</th>

            </tr>
          </thead>
          <tbody>
          {
                            this.state.users === null ? null : this.state.users.map((User, i) => {
                                return<tr key={i}>
                                    <td>{User.userId}</td>
                                    <td>{User.firstname}</td>
                                    <td>{User.lastname}</td>
                                    <td>{User.status}</td>
                                   <td> <button  className="btn btn-primary" onClick={()=>this.activateUser(User.email,User.password)}>Activate</button></td>
                                   <td><button  className="btn btn-danger" onClick={()=>this.deactivateuser(User.email,User.password)}>Deactivate</button></td>
                                    </tr>
                            })
                        }
                       
          </tbody>


        </table>



      </div>
    )
  }
}

export default Admin
