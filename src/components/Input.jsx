import React, { useId } from 'react'

// forwardRef is a function used to pass the ref to a child component
const Input = React.forwardRef(
    function Input({
        type = "text",
        label,
        className = "",
        ...props
    }, ref ) // Those who want to use, they have to pass a reference
    {
        const id = useId()
        
        return (
            <div className='w-full'>
                {/* If label is given then only label component is used */}
                {label && <label
                    className='inline-block mb-1 pl-1'
                    htmlFor={id} // this is not compulsary to use
                >
                    {label}
                </label>
                }

                <input
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-teal-50 duration-200 border border-gray-200 w-full ${className}`}
                    ref={ref} // this thing will give the reference to the parent component  
                    {...props}
                    id={id}
                />

            </div>
        )
    }
)

export default Input