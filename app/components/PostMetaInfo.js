import React from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers'

function PostMetaInfo({by, time, commentsNumber}) {
    return (
        <div>
            <span>by <Link to={`/user?id=${by}`} >{by}</Link></span>
            <span>on {formatDate(time)}</span>
            <span>with <Link to="/whatever" >{commentsNumber}</Link> comments</span>
        </div>
    )
}

export default PostMetaInfo
