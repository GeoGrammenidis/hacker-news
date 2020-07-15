import React, { Component } from 'react'
import queryString from 'query-string'
import { fetchUser } from '../utils/api'
import { formatDate } from '../utils/helpers'
import Posts from './Posts'
import Loading from './Loading'
import { ThemeConsumer } from '../contexts/theme'

export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            error: null,
            loading: true,
        }
        this._isMounted=false;
    }
    componentDidMount() {
        this._isMounted=true;
        fetchUser(queryString.parse(location.search).id)
        .then(user => this._isMounted&&this.setState({
            user,
            error: null,
            loading: false
        }))
        .catch(({message}) => this._isMounted&&this.setState({
            user,
            error: message,
            loading: false     
        }))
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const {user, loading, error} = this.state;
        return (
        <ThemeConsumer>
            {({ theme }) => (
                <>
                    {loading&&<Loading/>}
                    {error&&<div>{error}</div>}
                    {user&&<>
                        <h1 className="header">{user.id}</h1>
                        <div>
                            <div className={`meta-info-${theme}`}>
                                <span>joined <b>{formatDate(user.created)}</b></span>
                                <span>has <b>{user.karma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> karma</span>
                            </div>

                            <p dangerouslySetInnerHTML={{__html: user.about}} />
                            <h2>Posts</h2>
                        </div>
                        <Posts getMap={()=>Promise.all(user.submitted)} history={this.props.history} location={this.props.location} match={this.props.match}>
                        </Posts>
                    </>}
                </>
            )}
        </ThemeConsumer>)
    }
}