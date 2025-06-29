import React from 'react'

function Container({ children }) {
    return (
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8">{children}</div>
    )
}

export default Container