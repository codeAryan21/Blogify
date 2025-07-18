import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Logo, Button, Input } from './index'
import { login as authLogin } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm(); // Extracting `errors`
    const [error, setError] = useState("") // this state is for displaying the errors

    const [showPassword, setShowPassword] = useState(false) // Toggle password visibility


    const login = async (data) => {
        console.log(data);

        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/') // Redirect to the home page
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full my-8'>

            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>

                {/* If you don't have an account then go to signup */}
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Whenever the form is submitted, handleSubmit will be used there. 
                handleSubmit is a method where you will provide your login method. */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>

                    <div className='space-y-5' >
                        <Input
                            label="Email : "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    pattern: (value) =>
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                        "Please enter a valid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}


                        {/* Password Field with Show/Hide Toggle */}
                        <div className="relative">
                            <Input
                                label="Password : "
                                // type="password"
                                type={showPassword ? "text" : "password"} // Toggle type
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    // Here, the validate is not mandatory
                                    // validate: {
                                    //     pattern: (value) =>
                                    //         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value) ||
                                    //         "Password must be at least 8 characters long, include at least one letter, one number, and one special character."
                                    // }
                                })}
                            />

                            {/* Eye Icon Button */}
                            <button
                                type="button"
                                className="absolute top-[50%] right-4 transform -translate-y-1/2 text-gray-600 my-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>

                        </div>
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}


                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-blue-500 hover:underline text-sm"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        

                        <Button type='submit' className='w-full cursor-pointer'>Sign in</Button>

                        {/* This is for the error, Display Backend Error Message */}
                        {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}

                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login