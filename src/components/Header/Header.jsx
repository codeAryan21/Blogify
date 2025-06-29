import React from 'react'
import { Logo, LogoutBtn, Container } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    // We need to check from the state whether the user is authenticated or not.
    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    // Add the value to the object, and it directly gets added to the navigation.
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        }
    ]
    return (
        <header className='py-1 shadow bg-teal-500 text-slate-900'>
            <Container>
                <nav className='flex flex-col md:flex-row items-center gap-2 md:gap-0'>
                    <div className='mb-2 md:mb-0 md:mr-4 flex-shrink-0'>
                        <Link to='/'>
                            <Logo width='50px' />
                        </Link>
                    </div>
                    
                    <ul className='flex flex-nowrap overflow-x-auto max-w-full scrollbar-hide ml-auto items-center gap-1 text-sm font-semibold'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        className='inline-block px-2 py-1 whitespace-nowrap duration-200 hover:bg-blue-100 rounded-full'
                                        onClick={() => navigate(item.slug)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                         {/*  Show My Posts when the user is loggedIn */}
                        {authStatus && (
                            <li>
                                <Link
                                    to="/my-posts"
                                    className="inline-block px-2 py-1 whitespace-nowrap duration-200 hover:bg-blue-100 rounded-full"
                                >
                                    My Posts
                                </Link>
                            </li>
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )

}

export default Header