import React, { Component } from 'react'
import { fetchMap } from '../utils/api'
import Posts from './Posts'

export default class NewComp extends Component {
    getMap(){
        return fetchMap("new")
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