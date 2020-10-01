import React, { Component } from 'react'


import Slider from 'react-slick'
import Admin from './Admin'
import UserDetails from './UserDetails'
import Login from './Login'


// const photos =[
//   {
//   name: 'photo 1',
//   url:"todoimg1.jpg"
//   },
//   {
//   name: 'photo 2',
//   url:"todoimg2.jpg"
//   },
// {
//   name:'photo 3',
//   url:"todoimg3.png"
//   },
//   {
//     name:'photo 4',
//     url:"todoimg4.png"
//     },
//     {
//         name:'photo 5',
//         url:"todoimg5.jpg"
//         }
       
// ]


 class Home extends Component {
    
    constructor() {
        super()
        this.state = {
    
            adminlog: true,
            loggedin: true
    
        }
      }
    
      static getDerivedStateFromProps(props, state) {
    
        let token1 = sessionStorage.getItem("usertoken")
        let admintoken = sessionStorage.getItem("admintoken")
    
        if (admintoken == null) {
          if (token1 == null) {
            return { adminlog: false, loggedin: false }
          }
          else {
            return { adminlog: false, loggedin: true }
          }
        }
        else {
          return { adminlog: true }
        }
    
      }
      render() {
        // const settings = {
        //   dots: true,
        //   infinite: true,
        //   speed: 500,
        //   slidesToShow: 1,
        //   arrows:true,
        //   slidesToScroll: 1,
        //   className:"slides"
        // }
     
        if (this.state.adminlog) {
            return( <div>
              
              <Admin />
            </div>)
          }
          else if (this.state.loggedin) {
            return (<div>

              
              <UserDetails />
            </div>)
          }
          else {
            return (<div>

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
        </Slider> */}

              
              <Login />
              
            </div>)
          
      }
    }
    
}

export default Home
