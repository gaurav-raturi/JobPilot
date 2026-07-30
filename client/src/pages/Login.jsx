import React from 'react'
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                {
                    email, 
                    password
                }
            );
            
            //Save JWT
            localStorage.setItem('token', response.data.token);

            //Save logged-in-user
            localStorage.setItem('user', JSON.stringify(response.data.user));

            //Clear any old error message 
            setError('');

            toast.success('Login Successfully');

            //Redirect to dashboard
            navigate('/dashboard');
        }

        catch (error) {

            if (error.response) {
                setError(error.response.data.message);
        } else {
            setError(error.message);
    }
}
        finally {
            setLoading(false);
        }
    };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-300 via-white to-indigo-300 flex items-center justify-center p-4'>
        <motion.div 
        initial={{ opacity : 0, y : 40, scale : 0.95 }}
        animate={{ opacity : 1, y : 0, scale : 1 }}
        transition={{ duration : 0.5 }}
        className='w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8'>
            { /*Heading Section*/ }
            
            <div className='mb-6'>
                <Logo />
            </div>
            <h1 className='text-3xl font-bold text-center text-gray-800'>
                Job Pilot
            </h1>

            <h2 className='text-2xl font-semibold text-gray-700 text-center mt-4'>
                 Welcome Back
            </h2>

            <p className='text-gray-500 text-center mt-2 mb-8'>
                Sign in to continue your job search journey
            </p>

            {error && (
                <p className='text-red-500 text-sm text-center mb-4'>
                    {error}
                </p>
            )}

    { /*Form Section*/ }
    <form onSubmit={handleLogin}
    className='space-y-5'>
        { /*Email*/ }
        <div>
            <label htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-2'>
                Email
            </label>

            <div className='relative'>
            <Mail
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            size={20} />
            
            <input 
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter your email'>
            </input>
            </div>  
        </div>

        { /*Password*/ }
        <div>
            <label htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-2'>
            Password
            </label>
            
            <div className='relative'>
            <Lock 
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            size={20} />

            <input 
            type={showPassword ? 'text' : 'password'}
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter your password'>
            </input>

            <button 
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600'>
                { showPassword ? <EyeOff size={20} /> : <Eye size={20} /> }
            </button>
            </div>
        </div>

        { /*Remember Me & Forgot Password*/ }
        <div className='flex items-center justify-between'>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input 
                type='checkbox'
                className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500' 
                />

                <span className='text-sm text-gray-600'>
                    Remember me
                </span>
            </label>

            <button
            type='button'
            className='text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors'>
                Forgot Password?
            </button>
        </div>

        { /*Button*/ }
        <button 
        type='submit'
        disabled={loading}
        className=' flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition-all duration-300 mt-3'>
            {loading ? (
                <>
                <Loader2 className='w-5 h-5 animate-spin' />
                <span>Logging in...</span>
                </>
            ) : (
                'Login'
            )}
        </button>

        <p className='text-center text-sm text-gray-600'>
            Don't have an account?{" "}
            <span onClick={() => navigate('/register')}
            className='text-blue-600 font-semibold cursor-pointer hover:underline'>
                Create an account
            </span>
        </p>
        </form>
        </motion.div>
        
    </div>

  )
}

export default Login;
