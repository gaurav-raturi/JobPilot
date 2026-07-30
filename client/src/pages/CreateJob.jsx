import React, { useState } from 'react'
import { Briefcase, Building2, MapPin, IndianRupee, FileText } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from 'lucide-react';

const CreateJob = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [ formData, setFormData ] = useState({
    title : '',
    company : '',
    location : '',
    salary : '',
    jobType : '',
    status : 'Applied',
    description : ''
  });

  const [resume, setResume] = useState(null);   

  const handleChange = (e) => {

    const { name, value } = e.target; 

    setFormData({
      ...formData,
      [name] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('title', formData.title);
    data.append('company', formData.company);
    data.append('location', formData.location);
    data.append('salary', formData.salary);
    data.append('jobType', formData.jobType);
    data.append('description', formData.description);
    
    data.append('resume', resume);

    setLoading(true);

    try{

    const token = localStorage.getItem('token');

    const response = await axios.post(

      'http://localhost:5000/api/jobs',     //URL - Where to send the request
      data,        //DATA - What to send 
      {
        headers : {
          Authorization : `Bearer ${token }`   //CONFIG - Extra settings like headers
      }
    });
      
    console.log(response.data);

    toast.success('Job Created Successfully');

    navigate('/dashboard');
  }
  catch(error) {
    console.log(error.response?.data);
    console.log(error.response?.data?.message);
  }

  finally {
    setLoading(false);
  }
};

  return (  
      
    <div className='min-h-screen bg-gradient-to-r from-blue-100 via-white to-indigo-100 flex items-center justify-center p-6'>
      <motion.div
      initial={{ opacity : 0, y : 30, scale : 0.98 }}
      animate={{ opacity : 1, y : 0, scale : 1 }}
      transition={{ duration : 0.5, ease : 'easeOut' }}
      className='w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-10'>

      <div className='text-center mb-10'>

        <div className='flex justify-center mb-5'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg'>
            <span className='text-white text-2xl font-bold'>
              JP
            </span>
          </div>
        </div>

        <h1 className='text-3xl font-bold text-gray-800'>
          Create New Job
        </h1>

        <p className='text-gray-500 mt-2'>
          Create and manage your job opportunities
        </p>

      </div>

      <div className='flex justify-center mb-8'>
        <div className='inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium'>
          <Sparkles size={16} />
          Fill in the information below
        </div>
      </div>

      <form onSubmit={handleSubmit}
      className='space-y-6'>

        <div>
          <label 
          htmlFor='title'
          className='block text-sm font-medium text-gray-700 mb-2'>
            Job title
          </label>

          <div className='relative'>
            <Briefcase
            size={20}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
            </Briefcase>
        

            <input 
            type='text'
            id='title'
            name='title'
            placeholder='e.g. Frontend Developer'
            value={formData.title}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          <div>
            <label 
            htmlFor='company'
            className='block text-sm font-medium text-gray-700 mb-2'>
             Company
            </label>

          <div className='relative'>
            <Building2
            size={20}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
            </Building2>

            <input 
            type='text'
            id='company'
            name='company'
            placeholder='e.g. Google'
            value={formData.company}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div>
          <label 
          htmlFor='location'
          className='block text-sm font-medium text-gray-700 mb-2'>
            Location
          </label>

          <div className='relative'>
            <MapPin
            size={20}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
            </MapPin>

            <input 
            type='text'
            id='location'
            name='location'
            placeholder='e.g. Bangalore'
            value={formData.location}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label 
          htmlFor='salary'
          className='block text-sm font-medium text-gray-700 mb-2'>
            Salary 
          </label>

          <div className='relative'>
            <IndianRupee
            size={20}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
            </IndianRupee>

            <input 
            type='text'
            id='salary'
            name='salary'
            placeholder='e.g.  ₹12LPA'
            value={formData.salary}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div>
          <label 
          htmlFor='jobType'
          className='block text-sm font-medium text-gray-700 mb-2'>
            Job Type
          </label>
      
          <div className='relative'>
            <FileText
            size={20}
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
            </FileText>

            <select 
            id='jobType'
            name='jobType'
            value={formData.jobType}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'>

            <option value="">Select Job Type</option>
            <option value='Full Time'>Full Time</option>
            <option value='Part Time'>Part Time</option>
            <option value='Internship'>Internship</option>
            <option value='Remote'>Remote</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor='status'
          className='block text-sm font-medium text-gray-700 mb-2'>
            Status
          </label>

          <select 
          id='status'
          name='status'
          value={formData.status}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'>

          <option value='Applied'>Applied</option>
          <option value='Interview'>Interview</option>
          <option value='Offer'>Offer</option>
          <option value='Rejected'>Rejected</option>
          </select>
        </div>
      </div>

      <div>
        <label 
        htmlFor="description"
        className='block text-sm font-medium text-gray-700 mb-2'>
          Description
        </label>

        <textarea 
        name='description'
        id='description'
        placeholder='Describe the job role...'
        rows={5}
        value={formData.description}
        onChange={handleChange}
        className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Resume (PDF,DOC,DOCX)
        </label>

        <input
        type='file'
        accept='.pdf, .doc, .docx'
        onChange={(e) => setResume(e.target.files[0])}
        className='w-full border border-gray-300 rounded-lg p-2'>
        </input>
      </div>

      <div className='flex justify-end gap-4 pt-4'>

        <button 
        type='button'
        onClick={() => navigate('/dashboard')}
        className='px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition active:scale-95'>
          Cancel
        </button>

        <button 
        type='submit'
        disabled={loading}
        className='px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg hover:from-blue-700 shadow-lg hover:shadow-xl active:scale-95 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-lg'>
          {loading ? (
            <span className='flex items-center gap-2'>
              <Loader2 size={20} className='animate-spin' />
              Creating...
            </span>
          ) : (
            'Create Job'
          )}
        </button>
      </div>

      </form>

      </motion.div>
    </div>

  );
};

export default CreateJob;
