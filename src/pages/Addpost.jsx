import React from 'react'
import { Container, PostForm } from '../components'

function Addpost() {
    return (
        <div className="min-h-screen flex items-center justify-center py-8 px-2">
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default Addpost