import React from 'react'
import Blog from '../assets/Blog.png'

function Logo({ width = '100px'}) {
    return (
        <img src={Blog} alt="Blog Logo" style={{ width }} />
    )
}

export default Logo