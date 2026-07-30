import React, { useEffect, useState } from 'react'
import { Briefcase, Building2, MapPin, IndianRupee, FileText, Sparkles, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';

const EditJob = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [ formData, setFormData ] = useState({
    title : '',
    company : '',
    location : '',
    salary : '',
    jobType : '',
    status : 'Applied',
    description : '',
    resume : null
  });

  const handleChange = (e) => {

    const { name, value } = e.target; 

    setFormData((prev) => ({
      ...prev,
      [name] : value
    }));
  };

  const handleFileChange = (e) => {

    setFormData({
      ...formData,
      resume : e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try{

    const token = localStorage.getItem('token');

    const updatedFormData = new FormData();

    updatedFormData.append('title', formData.title);
    updatedFormData.append('company', formData.company);
    updatedFormData.append('location', formData.location);
    updatedFormData.append('salary', formData.salary);
    updatedFormData.append('jobType', formData.jobType);
    updatedFormData.append('status', formData.status);
    updatedFormData.append('description', formData.description);

    updatedFormData.append('resume', formData.resume);


    const response = await axios.put(

      `http://localhost:5000/api/jobs/${id}`, 
      updatedFormData,         
      {
        headers : {
          Authorization : `Bearer ${token }`   
      }
    });
      
    toast.success('Job updated successfully!');

    navigate('/dashboard');
  }
  catch(error) {
    console.log(error)
    toast.error('Failed to update Job');
  }

  finally {
    setLoading(false);
  }
};

  useEffect(() => {

    const fetchJob = async () => {

      try {

        const token = localStorage.getItem('token');

        const response = await axios.get(
          `http://localhost:5000/api/jobs/${id}`,
          {
            headers : {
              Authorization : `Bearer ${token}`,
            },
          }
        );

        setFormData(response.data.job);
        
      } 
      catch(error) {
        console.log(error);
      }

    };

    fetchJob();
  }, [id]);
  

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center p-6'>
      <motion.div
      initial={{ opacity : 0, y : 30, scale : 0.98 }} 
      animate={{ opacity : 1, y : 0, scale : 1 }}
      transition={{ duration : 0.5, ease : 'easeOut' }}
      className='w-full max-w-4xl bg-white/80 backdrop-blur-xl mx-auto rounded-3xl border border-white/30 shadow-2xl p-10'>
        <div className='text-center mb-10'>
          <div className='flex justify-center mb-5'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg'>
              <span className= 'text-white text-2xl font-bold'>
                JP
              </span>
            </div>
          </div>

          <h1 className='text-3xl font-bold text-gray-800'>
            Edit Job
          </h1>

          <p className='text-gray-500 mt-2'>
            Update your job details below
          </p>
        </div>

        <div className='flex justify-center mb-8'>
          <div className='inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full font-medium'>
            <Sparkles size={16} />
              Update your job information
          </div>
        </div>

        <form onSubmit={handleSubmit}
        className='space-y-6'>

          { /*Job title*/ }
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

          { /*Company and Location*/ }
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

          { /*Salary and JobType*/ }
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

          { /*Description*/ }
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

          { /*Resume*/ }
          <div>
            <label  className='block text-sm font-medium text-gray-700 mb-2'>
              Resume
            </label>

            <input
            type='file'
            accept='.pdf, .doc, .docx'
            onChange={handleFileChange}
            className='w-full border rounded-lg p-3'>
            </input>
          </div>

          { /*Buttons*/ }
          <div className='flex justify-end gap-4 pt-4'>

          <button 
          type='button'
          onClick={() => navigate('/dashboard')}
          className='px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition'>
            Cancel
          </button>

          <button
          type='submit'
          disabled={loading}
          className='px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 to-indigo-700 active:sacle-95 text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'>
            {loading ? (
              <span className='flex items-center gap-2'>
                <Loader2 size={20} className='animate-spin' />
                Updating...
              </span>
            ) : (
              'Update Job'
            )}
        </button>
      </div>
      </form>


    </motion.div>
    </div>
  );
};

export default EditJob;
