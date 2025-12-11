import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if(user) navigate("/");
    }, [user])

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 space-y-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Login</h1>
                        <p className="text-sm text-gray-500">Welcome back! Please login to your account</p>
                    </div>
                    <form onSubmit={submitHandler} className="space-y-5">
                        {/* Email */}
                        <div>
                            <Label className="font-medium text-gray-700">Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="john@example.com"
                                className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <Label className="font-medium text-gray-700">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="mt-1 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {/* Role Selection */}
                        <RadioGroup className="flex gap-6 my-3">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    id="r1"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    id="r2"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white flex justify-center items-center rounded-xl py-3 text-lg font-medium"
                        >
                            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            {loading ? "Please wait" : "Login"}
                        </Button>
                        <p className="text-sm text-center text-gray-500">
                            Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
