import React, { Component } from 'react'
import { fetchData } from '../utils/api'

export default class Wrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            data: [],
            dataMap: [],
            error: null,
            loading: false,
        }
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
    }

    componentDidUpdate(prevProps, prevState){
        if(Object.entries(prevState).toString() === Object.entries(this.state).toString()&&
            Object.entries(prevProps).toString() === Object.entries(this.props).toString()){
                console.log("did nothing in wrapper update")
        }
        else if(prevProps.dataMap!==this.props.dataMap){
            console.log("~~~~~~~~~~~Wrapper didUpdate if~~~~~~~~~~~~~~~~")
            console.log('START')
            this.setState({
                dataMap: [...this.props.dataMap],
                counter: 0,
                data: [],
                loading: true
            })
            console.log(`data size: ${this.state.data.length}`)
            console.log("loading TRUE")
        }else{
            console.log(`checking: ${this.state.counter*this.props.incr} < ${this.state.dataMap.length} && ${this.state.data.length}<${this.props.incr} with result: ${this.state.counter*this.props.incr < this.state.dataMap.length
                && this.state.data.length < this.props.incr}`) 
            if(
                this.state.counter*this.props.incr < this.state.dataMap.length
                && this.state.data.length < this.props.incr
            ){
                console.log(`FETCHING: from ${this.state.counter*this.props.incr} to ${this.state.dataMap.length-this.state.counter*this.props.incr>this.props.incr?this.state.counter*this.props.incr+this.props.incr:this.state.dataMap.length}`)
                fetchData(
                    this.state.dataMap.slice(this.state.counter*this.props.incr,
                        this.state.dataMap.length - this.state.counter*this.props.incr > this.props.incr?
                        this.state.counter*this.props.incr + this.props.incr:
                        this.state.dataMap.length
                    )
                ).then(data=>{
                        if(this.props.location.pathname==="/user"){
                            console.log("filtered data")
                            data = data.filter((x) => x.type==="story")
                        }
                        this._isMounted&&this.setState(prevState=>({
                                loading: true,
                                counter:prevState.counter+1,
                                data:[...prevState.data, ...data]
                            })
                        )
                    }
                )
            }else if(this.state.loading){
                console.log("Loading FALSE")
                this.setState({loading:false})
            }else {
                console.log("END")
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {data, error, loading} = this.state;
        return (
            <>
                {this.props.children({data, error, loading})}
            </>
        )
    }
}