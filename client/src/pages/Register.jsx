import React, { useState } from 'react'
import { User, Mail, Lock } from 'lucide-react';
import { Sparkles, EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import Logo from '../components/Logo';

const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : ''
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();

    if(!name || !email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    //Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if(password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try { 

      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        {
          name,
          email,
          password
        }
      );

      toast.success('Account created successfully');
      
      navigate('/login');
    }

    catch(error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || 'Registration failed!'
      );
    }

    finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center p-4'>
      <motion.div 
      initial={{ opacity : 0, y : 40, scale : 0.95 }}
      animate={{ opacity : 1, y : 0, scale : 1 }}
      transition={{ duration : 0.5 }}
      className='w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-10'>

        <div className='mb-8'>
          <Logo />
        </div>


        <h1 className='text-3xl font-bold text-center text-gray-800'>
          Create Account
        </h1>

        <p className='text-center text-gray-500 mt-2'>
          Join JobPilot and start managing your jobs.
        </p>

        <div className='flex justify-center mt-6 mb-6'>
          <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium'>
            <Sparkles size={20} />
            Create your free Account
          </div>
        </div>

        <form onSubmit={handleSubmit}
        noValidate
        className='space-y-5'>
        <label
        htmlFor='name'
        className='block text-sm font-medium text-gray-700 mb-2'>
          Full Name
        </label>

        <div className='relative'>
          <User 
          size={20}
          className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
          />

          <input 
          type='text'
          id='name'
          name='name'
          placeholder='Enter your full name'
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
          />
        </div>

        <div>
          <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700 mb-2'>
            Email
          </label>

          <div className='relative'>
            <Mail 
            size={20}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <input 
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
            />
          </div>
        </div>

        <div>
          <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700 mb-2'>
            Password
          </label>

          <div className='relative'>
            <Lock 
            size={20}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <input 
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'   
            placeholder='Enter your Password'
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
            />

            <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed'>
              {showPassword ?  <EyeOff size={20} /> : <Eye size={20} /> }
            </button>
          </div>
        </div>

        <div>
          <button 
          type='submit'
          disabled={loading}
          className='w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'>
            {loading ? (
              <span className='flex items-center justify-center gap-2 w-full'>
                <Loader2 size={20} className='animate-spin' />
                  Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          <p className='text-center text-sm text-gray-500 mt-6'>
            Already have an account?{" "}
            <span
            onClick={() => navigate('/login')}
            className='text-blue-600 font-semibold cursor-pointer hover:underline'>
             Login
            </span>
          </p>
        </div>
        </form>
      </motion.div>


      </div>

  );
};

export default Register;
