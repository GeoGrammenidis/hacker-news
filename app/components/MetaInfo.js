import React from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/theme'

export default function MetaInfo({by, time, commentsNumber, postId}) {
    return (

        <ThemeConsumer>

            {({ theme }) => (
                    <div className={`meta-info-${theme}`}>
                        <span>by <Link to={`/user?id=${by}`} >{by}</Link></span>
                        <span>on {formatDate(time)}</span>
                        {
                            commentsNumber!==undefined&&
                                <span>with <Link to={`/post?id=${postId}`} >{commentsNumber}</Link> comments</span>
                        }
                    </div>
            )}
        </ThemeConsumer>
    )
}
MetaInfo.propType = {
    postId: PropTypes.number.isRequired,
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    commentsNumber: PropTypes.number
}
