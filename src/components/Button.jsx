function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    hover = 'hover:bg-blue-700',
    className = '',
    ...props

}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${hover} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button