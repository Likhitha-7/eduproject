import React,{Component} from 'react';
import QuickSearch from './QuickSearch';

const url = "https://apiintern.herokuapp.com/meal";

class QuickApi extends Component{

    constructor(){
        super()

        this.state={
            mealtype:''
        }
    }

    render(){
        return(
            <QuickSearch quickData={this.state.mealtype}/>
        )
    }

    componentDidMount(){
        fetch(url,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({mealtype:data})
        })
    }
}

export default QuickApi;