import React, { Component } from 'react'
import ToDoApi from '../ApiServices/ToDoApi'


export class SignUp extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        firstname: "",
        lastname: "",
        gender: "Male",
        dob: "",
        email: "",
        password: "",
        confirmpass: "",
        registercomplete: false,
        fnameError:'',
        lnameError:'',
        genderError:'',
        dobError:'',
        emailError:'',
        passwordError:'',
        otp:""

      }
      this.basestate=this.state
    }

    changeData=(e)=>{
        this.setState({
          [e.target.name]:e.target.value
        })
    }

    validform(){
          var isValid=true;
        if(this.state.firstname.length===0){
            this.setState({
                fnameError:'firstName should not be empty'
            })
            isValid=false
        }
        else if(this.state.firstname.length>0){
            this.setState({
                fullNameError:''
            })
            isValid=true
        }

        
        if(this.state.lastname.length===0){
            this.setState({
                lnameError:'LastName should not be empty'
            })
            isValid=false
        }
        else if(this.state.lastname.length>0){
            this.setState({
                lnameError:''
            })
            isValid=true
        }

        
        if(this.state.gender.length===0){
            this.setState({
                genderError:'gender should not be empty'
            })
            isValid=false
        }
        else if(this.state.gender.length>0){
            this.setState({
                genderError:''
            })
            isValid=true
        }

        if(this.state.dob.length===0){
            this.setState({
                dobError:'DOB should not be empty'
            })
            isValid=false
        }
        else if(this.state.dob.length>0){
            this.setState({
                dobError:''
            })
            isValid=true
        }
        if(!this.state.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
            this.setState({
                emailError:'email should contain @ and .'
            })
            isValid=false
        }
        else if(this.state.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
            this.setState({
                emailError:''
            })
            isValid=true
        }
        if(!this.state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}/)){
            this.setState({
                passwordError:'password should contain 1 special symbol 1 capital and length 8 char'
            })
            isValid=false
        }
        else if(this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)){
                    this.setState({
                        passwordError:''
                    })
                    isValid=true
        }
        if(this.state.password!=this.state.confirmpass){
            this.setState({
                passwordError:'password and confirm password not match'
            })
            isValid=false
        }
        else if(this.state.password=this.state.confirmpass){
            this.setState({
                passwordError:''
            })
            isValid=true
        }
        return isValid




    }

    submitData=(e)=>{
            e.preventDefault();
            const validate=this.validform();
            //let bd=
            console.log(this.state.dob)
            //console.log(dt)
            var dt=new Date(this.state.dob);
            var year=dt.getFullYear();
           // console.log(year);
            let d=new Date().getFullYear();
            console.log(d)

            var dif=d-year;
            console.log(dif)

            if(validate==true){
                if(dif>=18){

               // this.adduser();
            }
            else{
                alert('you are not able register age is less than 18')
            }
            // const email=this.state.email
            //  console.log(email)
            //     ToDoApi.sendMail(email).then(res=>{
            //         console.log(res.result)
            //         this.setState({otp : res.data.result});
            //         // alert(this.state.otp);
            //         this.adduser();
         
            //     }).catch(error=>{
            //         console.log(error)
            //     })

           
            }
            else{
                console.log('Something is wrong');
            }
        


    }
    adduser=()=>{
       // var num = prompt(" enter otp which as send to your email");
        // if(this.state.otp===num){}

        let user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            gender: this.state.gender,
            dob: this.state.dob,
            email: this.state.email,
            password: this.state.password
        }
        ToDoApi.addUser(JSON.stringify(user)).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                alert(res.data)
                this.setState({ registercomplete: true })
                this.setState(this.basestate);
                this.props.history.push('/');
            }
        })
            .catch(error => {
                console.log(error)
            })
        
        // else{
        //     alert(" signin failed");
        // }

    }

    reset=()=>{
        this.setState(this.basestate);
    }
    
  render() {
      const{firstname,lastname,gender,dob,email,password,confirmpass}=this.state
    return (
      <div>
        
        <center><h1>Register Now</h1></center>
        <div className="container">
                    <form autoComplete='off'  >
                        <div className='form-group col-md-10'>
                            <label className='float-left block-text text-darken-2 s' style={{float:'left'}}>First Name<span aria-hidden='true' style={{color:'red'}}> *</span></label>
                            <input type="text" required className='form-control' name='firstname' 
                            value={firstname} placeholder="First name" onChange={this.changeData}/>
                        </div>
                        <div style={{fontSize:12,color:"red"}}>
                           {this.state.fnameError}
                        </div>
                        <div className='form-group col-md-10'>
                            <label className='float-left block-text text-darken-2 s' style={{float:'left'}}>Lastname<span aria-hidden='true' style={{color:'red'}}> *</span></label>
                            <input type="text" required className='form-control' 
                            value={lastname} name='lastname' placeholder="Lastname" onChange={this.changeData}/>
                        </div>
                        <div style={{fontSize:12,color:"red"}}>
                            {this.state.lnameError}
                        </div>
                        <div className="form-group">
                                <label style={{float:'left'}} className='float-left block-text text-darken-2 s'>Date of birth<span aria-hidden='true' style={{color:'red'}}> *</span></label>
                                <input type="date" name='dob' value={dob} onChange={this.changeData} placeholder="date of birth"></input>
                                
                        </div>
                        <div style={{fontSize:12,color:"red"}}>
                            {this.state.dobError}
                        </div>


                        <div className="form-group">
                           <label style={{float:'left'}} className='float-left block-text text-darken-2 s'>Gender<span aria-hidden='true' style={{color:'red'}}> *</span></label>
                           <select required value={this.state.gender} onChange={this.changeData} name="gender" className="form-control">
                                        <option value={'Male'}>Male</option>
                                        <option value={'Female'}>Female</option>
                                        <option value={'Other'}>Other</option>

                            </select>

                        </div>
                        <div style={{fontSize:12,color:"red"}}>
                            {this.state.genderError}
                        </div>

                        <div className='form-group col-md-10'>
                            <label className='float-left block-text text-darken-2 s'style={{float:'left'}}>Email Id<span aria-hidden='true' style={{color:'red'}}> *</span></label>
                            <input type="text" required className='form-control'
                            value={email} name='email' placeholder="Email Id" onChange={this.changeData}/>
                        </div>
                        <div style={{fontSize:12,color:"red"}}>
                            {this.state.emailError}
                        </div>
                        <div className='form-group col-md-10'>
                            <label className='float-left block-text text-darken-2 s' style={{float:'left'}}>Password<span aria-hidden='true' style={{color:'red'}}> *</span></label>
                            <input type="password" required className='form-control' 
                            value={password} name='password' placeholder="Password" onChange={this.changeData}/>
                        </div>
                        <div style={{fontSize:12,color:"red"}}>
                            {this.state.passwordError}
                        </div>

                        <div className='form-group col-md-10'>
                            <label className='float-left block-text text-darken-2 s' style={{float:'left'}}>Confirm Password<span aria-hidden='true' style={{color:'red'}}> *</span></label>
                            <input type="password" required className='form-control' 
                            value={confirmpass} name='confirmpass' placeholder="confirmPassword" onChange={this.changeData}/>
                        </div>
                        <div style={{fontSize:12,color:"red"}}>
                            {this.state.passwordError}
                        </div>
                       

                        <div>
                        <button type="button" className='btn btn-primary m-2' onClick={this.reset}> Reset</button>
                             
                            <button type="button" className='btn btn-primary m-2' onClick={this.submitData}>Sign Up</button>
                            </div>
                    </form>
                </div>
     

     

      </div>
    )
  }
}

export default SignUp
