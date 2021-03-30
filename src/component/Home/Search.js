import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import './Search.css';

const url = "https://apiintern.herokuapp.com/city";
const rurl = "https://apiintern.herokuapp.com/rest?city="

class Search extends Component{

    constructor(props){
        super(props)

        this.state={
            city:'',
            rest:'',
            username:'',
            imgurl:''
        }
    }

    //Display City in option
    renderCity = (data) => {
        if(data){
            return data.map((item)=>{
                return(
                    <option value={item.city}>{item.name} | {item.city_name}</option>
                )
            })
        }
    }

    renderRest = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option value={item._id}>{item.name} | {item.locality}</option>
                )
            })
        }
    }

    handleCity=(event)=>{
        console.log(event.target.value)
        const cityId = event.target.value;
        fetch(`${rurl}${cityId}`,{method:'GET'})
        .then((res)=> res.json())
        .then((data) => {
            this.setState({rest:data})
        })
    }
    handleRest=(event)=>{
        this.props.history.push(`/details/${event.target.value}`)
    }
    conditionalButton =() =>{
        console.log(sessionStorage.getItem('username'))
        console.log(">>>this,state",this.state)
        if(sessionStorage.getItem('username') == null || sessionStorage.getItem('username') == undefined){
            return(
                    <a href='https://github.com/login/oauth/authorize?client_id=cb7a83e9c3d66b171004'>
                            Login With Github
                    </a>
            )
        }
        else{
            return(
                <>
                    <img src={this.state.imgurl} style={{height:100,width:100}}/>
                    Hi {this.state.username}
                </>
            )
            
        }
    }

    render(){
        console.log(">>>>",this.props);
        return(
            <React.Fragment>
                <div class="imageContainer">
                    <div style={{textAlign:'right'}}>
                        {this.conditionalButton()}
                        <a className="fb myfont" href="https://www.facebook.com/" target="_blank">
                            <img src="/images/facebook.png" className="social_logo"/>
                        </a>
                        <a class="yt myfont" href="https://www.youtube.com/developerfunnel" target="_blank">
                            <img src="/images/youtube.png" className="social_logo"/>
                        </a>
                    </div>
                    <div id="logo">
                        <b>e!</b>
                    </div>
                    <div id="heading">
                        Find Bést Restaurants, Cafés, bars
                    </div>
                    <div className="locationSelector">
                        <select class="dropdown" onChange={this.handleCity}>
                            <option>----SELECT CITY----</option>
                            {this.renderCity(this.state.city)}
                        </select> 
                        <select className="dropdown" onChange={this.handleRest}>
                            <option>----SELECT REST----</option>
                            {this.renderRest(this.state.rest)}
                        </select>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    //call api to get data
    componentDidMount(){
        const code = (this.props.location.search).split('=')[1];
        if(code){
            let requestData={
                code:code
            }
            console.log("requestData>>>",requestData)
            fetch('http://localhost:6700/users',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then((res)=>res.json())
            .then((data) =>{
                var user = data.login;
                var img = data.avatar_url
                sessionStorage.setItem('username',user)
                fetch(url,{method:'GET'})
                .then((res) => res.json())
                .then((data)=> this.setState({city:data,username:user,imgurl:img}))
            })
        }
        // fetch(url,{method:'GET'})
        // .then((res) => res.json())
        //setting data in state
        // .then((data)=> this.setState({city:data}))
    }
}
export default withRouter(Search);