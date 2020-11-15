import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post() {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar className='post_avatar'
                    alt='BobbyTito'
                    src="/static/images/avatar/1.pg"
                />
                <h3>username</h3>
            </div>

            <img className='post_image'
            src="https://lerablog.org/wp-content/uploads/2019/02/React-JS.jpg" alt=""
            />

            <h4 className='post_text'><strong>bobby_tito: </strong>Wow coding is clone is fun</h4>
        </div>
    )
}

export default Post
