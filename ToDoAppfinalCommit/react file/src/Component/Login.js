import React, { Component } from 'react'
import ToDoApi from '../ApiServices/ToDoApi'
import { NavLink, Redirect } from 'react-router-dom'
import { Slider } from '@material-ui/core'


const photos =[
  {
  name: 'photo 1',
  url:"todoimg1.jpg"
  },
  {
  name: 'photo 2',
  url:"todoimg2.jpg"
  },
{
  name:'photo 3',
  url:"todoimg3.png"
  },
  {
    name:'photo 4',
    url:"todoimg4.png"
    },
    {
        name:'photo 5',
        url:"todoimg5.jpg"
        }
       
]



export class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email:'',
       password:'',
       adminlog: false,
       loggedin: false

    }
  }
  
changeData=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

checkUserValid=(e)=>{
  console.log(this)
  e.preventDefault();
  let emailpass={
   email:this.state.email,
   password:this.state.password
  }

  ToDoApi.Login(JSON.stringify(emailpass)).then(res=>{


    if(res.status===200){
      console.log(res.data)
      let data=res.data
      if(data==="Not Match"){
          alert("You are not registered till now or email or password is incorrect"+
          "\nOr Your account is deactivated by admin wait to activate account by user");
      }
      else if(data==="admin"){
          sessionStorage.setItem("admintoken",true)
          alert("Login Successfully")
          console.log(this)
         // this.props.history.push('/admin')

          this.setState({adminlog:true})
      }
      else if(data==="user"){
          sessionStorage.setItem("usertoken",emailpass.email)
          sessionStorage.setItem("userlogtoken",true)
          alert("Login Successfully")

          //this.props.history.push('/user')

          

          this.setState({loggedin:true})
      }
  }
  else{
      alert("Something's Wrong")
  }
})
.catch(error =>{
  //alert("Error While Fetching Data : Server Side Problem")
  console.log(error)
})


  

}
signup=()=>{
  this.props.history.push('/addUser')
}

  render() {
    const {email,password}=this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows:true,
      slidesToScroll: 1,
      className:"slides"
    }
 

    if(this.state.loggedin){
      return<Redirect to='/user'></Redirect>
    }

    if(this.state.adminlog){
      return<Redirect to='/admin'></Redirect>
    }
    return (
      <div>

{/* <Slider  {...settings}>
         {photos.map((photo)=>{
           return(
             <div>
               <center>
               <img width="800px" height="400px" src={photo.url}/>
               </center>
             </div>
           )
         })}
        </Slider>  */}
              <center>
                <div className='row container center wrap'>
                  <form  className='m-5 col-md-8'>
                  <img src="login.jpg" alt="this is login image"></img>
                        <div className='form-group'>
                              <input required  type='text' value={email} name='email' onChange={this.changeData} placeholder='enter email' />
                        </div>
                        <div className='form-group'>
                              <input required type='password' name='password' value={password} onChange={this.changeData} placeholder='enter password'/>
                        </div>
                        <div>
                            <button type='button' className='btn btn-primary float-left' onClick={this.checkUserValid}>Login</button>
                            <NavLink to="/addUser" className="btn btn-primary">SignUp</NavLink>
                            </div>
                            

                  </form>
                </div>
              </center>
      </div>
    )
  }
}

export default Login
