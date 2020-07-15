import React, { Component } from 'react'
import Wrapper from './Wrapper';
import DataDisplay from './DataDisplay';
import { fetchMap } from '../utils/api'

export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postsMap: [],
        }
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        this.props.getMap().then(
            postsMap=>{
                this._isMounted&&this.setState({postsMap})
            }
        );
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <Wrapper dataMap={this.state.postsMap} incr={50} history={this.props.history} location={this.props.location} match={this.props.match} >
                {({loading, error, data}) => {
                    return (
                        <DataDisplay 
                            data={data}
                            error={error}
                            loading={loading}
                            history={this.props.history}
                            location={this.props.location}
                            match={this.props.match}
                        />
                    )
                }}
            </Wrapper>
        )
    }
}