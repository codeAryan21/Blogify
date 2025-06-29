import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Logo, Button, Input } from './index'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react' // Import eye icons for visibility toggle

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm(); // Extracting `errors`
    const [error, setError] = useState('') // this state is for displaying the errors

    const [showPassword, setShowPassword] = useState(false) // Toggle password visibility

    const create = async (data) => {
        console.log(data);

        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">

            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                <form onSubmit={handleSubmit(create)} className='mt-8'>

                    <div className='space-y-5'>
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            label="Full Name : "
                            {...register("name", {
                                required: "Full name is required"
                            })}
                        />
                        {/* This is optional to show that full name is required */}
                        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}


                        {/* This is the additional thing, If you want to create a signUp page with the first name, middle name and last name then use this else leave it. */}
                        {/* <Input
                            type="text"
                            placeholder="Enter your first name"
                            label="First Name: "
                            {...register("firstName", {
                                required: "First name is required",
                                maxLength: {
                                    value: 20,
                                    message: "First name cannot exceed 20 characters"
                                }
                            })}
                        />

                        <Input
                            type="text"
                            placeholder="Enter your middle name"
                            label="Middle Name: "
                            {...register("middleName")}
                        />


                        <Input
                            type="text"
                            placeholder="Enter your last name"
                            label="Last Name: "
                            {...register("lastName", {
                                required: "Last name is required",
                                maxLength: {
                                    value: 20,
                                    message: "Last name cannot exceed 20 characters"
                                }
                            })}
                        /> */}

                        <Input
                            label="Email : "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    pattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Please enter a valid email address"
                                }
                            })}
                        />
                        {/* This is optional to show that email is required */}
                        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}


                        {/* Password Field with Show/Hide Toggle */}
                        <div className="relative">
                            <Input
                                label="Password : "
                                // type="password"
                                type={showPassword ? "text" : "password"} // Toggle type
                                placeholder="Enter your password"
                                {...register("password", {
                                    // required: true
                                    required: "Password is required",
                                    validate: {
                                        pattern: (value) =>
                                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value) ||
                                            "Password must be at least 8 characters long, include at least one letter, one number, and one special character."
                                    }
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
                        {/* This is optional to show that password is required */}
                        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

                        <Button type="submit" className='w-full cursor-pointer'>Create Account</Button>

                        {/* This is for the error, Display Backend Error Message */}
                        {error && <p className="text-red-600 text-sm">{error}</p>}

                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default Signup