import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Loading extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            message:this.props.text
        }
    }
    
    componentDidMount(){
        const {speed, text} = this.props;
        this.interval = setInterval(()=>{
            this.state.message === text + "..."?
                this.setState({message:text}):
                this.setState(prevState=>({message: prevState.message + "."}));
        },speed)
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <div>{this.state.message}</div>
        )
    }
}
Loading.propType = {
    text: PropTypes.string,
    speed: PropTypes.number
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}
