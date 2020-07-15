import React, { Component } from 'react'
import Posts from './Posts'
import { fetchMap } from '../utils/api'

export default class TopComp extends Component {

    getMap(){
        return fetchMap("top")
    }
    render() {
        return (
            <Posts
                getMap={this.getMap}
                history={this.props.history}
                location={this.props.location}
                match={this.props.match}>
            </Posts>
        )
    }
}