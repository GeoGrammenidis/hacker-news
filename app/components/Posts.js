import React, { Component } from 'react'
import { stories } from '../utils/api'
import PostsList from './PostsList'

class Posts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts: null,
            error: null,
            loading: true,
        }
    }
    componentDidMount() {
        this.fetch()
    }
    componentDidUpdate(prevProps) {
        if(prevProps!=this.props){
            this.fetch();
        }
    }

    fetch() {
        this.setState({
            posts: null,
            error: null,
            loading: true
        });
        stories(this.props.storyType)
            .then(posts=>this.setState({
                posts,
                error: null,
                loading: false
            }))
            .catch(({message})=>this.setState({
                error: message,
                loading: false 
            }));
    }

    render() {
        const {posts, error, loading} = this.state;
        return (
            <>
                {loading&&<div>loading</div>}
                {error&&<div>{error}</div>}
                {posts&&<PostsList posts={posts}/>}
            </>
        )
    }
}

export default Posts
