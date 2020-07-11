import React, { Component } from 'react'
import queryString from 'query-string'
import { fetchUser } from '../utils/api'
import { formatDate } from '../utils/helpers'

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            error: null,
            loading: true,
        }
    }
    componentDidMount() {
        fetchUser(queryString.parse(location.search).id)
        .then(user => this.setState({
            user,
            error: null,
            loading: false
        }))
        .catch(({message}) => this.setState({
            user,
            error: message,
            loading: false     
        }))
    }

    render() {
        console.log(queryString.parse(location.search).id)
        console.log(this.state)
        const {user, loading, error} = this.state;
        return (<>
            {loading&&<div>Loading...</div>}
            {error&&<div>{error}</div>}
            {user&&<>
                <h1>{user.id}</h1>
                <div>
                    <span>joined {formatDate(user.created)}</span>
                    <span>has {user.karma} karma</span>
                    <p dangerouslySetInnerHTML={{__html: user.about}} />
                    <h2>Posts</h2>
                </div>
                
            </>}
        </>)
    }
}

export default User
