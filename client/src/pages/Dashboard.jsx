import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Pen, Pencil, Trash2, Clock, UserCheck, FileCheck, CheckCircle, XCircle, User, Search, Briefcase, Layers, Building2, MoreVertical, SquarePen, Trash, Star, StarOff, IndianRupee, CircleCheck  } from 'lucide-react';
import toast from 'react-hot-toast';
import DeleteModal from '../components/DeleteModal';
import DropDownMenu from '../components/DropDownMenu';
import Logo from '../components/Logo';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import AIChatButtons from '../components/AIChatButtons';
import AIChatWindow from '../components/AIChatWindow';

const Dashboard = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('All');
  const [openMenu, setOpenMenu] = useState(null);
  const [showFavourite, setShowFavourite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [isChatOpen, setIsChatOpen] = useState(false);

  //Read the saved user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  //Pagination Logic
  const jobsPerPage = 5;

  const lastJobIndex = currentPage * jobsPerPage;

  const firstJobIndex = lastJobIndex - jobsPerPage;

   useEffect(() => {

    const fetchJobs = async () => {

      try {

      //Get the token
      const token = localStorage.getItem('token');

      //Make the API call
      const response = await axios.get(
        'http://localhost:5000/api/jobs',
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );

      //Save the jobs in state
      setJobs(response.data.jobs || []);
    }

    catch(error) {
      console.error(error);
    }
  
    finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, jobType, showFavourite]);

useEffect(() => {
  if(selectedJobDetails) {
      document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto';
  };
}, [selectedJobDetails]);

  if(loading) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent'></div>
          <p className='text-lg font-medium text-gray-600'>
            Loading Jobs...
          </p>
        </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }; 
  
  const handleDelete = async (id) => {

    setDeleteLoading(true);

    try { 

      const token = localStorage.getItem('token');

      const response = await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers : {
            Authorization : `Bearer ${token}`
          },
        }
      );

      setJobs(jobs.filter((job) => job._id !== id));

      toast.success('Job deleted Successfully!');
    }

    catch(error) {
      console.log(error);
    }

    finally {
      setDeleteLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {

    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesJobType = 
        jobType === 'All' || job.jobType === jobType;

      const matchesFavourite = 
        !showFavourite || job.isFavourite;

        return matchesSearch && matchesJobType && matchesFavourite;

  });

  const sortedJobs = [...filteredJobs];

  sortedJobs.sort((a,b) => {

    switch(sortBy) {

      case 'newest':
        return new Date(b.createAt) - new Date(a.createAt);

      case 'oldest':
        return new Date(a.createAt) - new Date(b.createAt);

      case 'company-asc':
        return a.company.localeCompare(b.company);

      case 'company-desc':
        return b.company.localeCompare(a.company);

      case 'salary-low':
        return a.salary - b.salary;

      case 'salary-high':
        return b.salary - a.salary;

      default:
        return 0;
    }
  });

  //Pagination Logic 
  const currentJobs = sortedJobs.slice(firstJobIndex, lastJobIndex);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const getStatusStyle = (status) => {

    switch(status) {

      case 'Applied':
        return 'bg-yellow-100 text-yellow-700';

      case 'Interview':
        return 'bg-purple-100 text-purple-700';

      case 'Offer':
        return 'bg-green-100 text-green-700';

      case 'Rejected':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const appliedJobs = jobs.filter((job) => job.status === 'Applied').length;

  const interviewJobs = jobs.filter((job) => job.status === 'Interview').length;

  const offerJobs = jobs.filter((job) => job.status === 'Offer').length;

  const getStatusConfig = (status) => {

    switch(status) {

      case 'Applied':
        return {
        color :'bg-yellow-100 text-yellow-700',
        icon : Clock
      };

      case 'Interview':
        return {
          color : 'bg-blue-100 text-blue-700',
          icon : FileCheck
      };
      
      case 'Offer':
        return {
          color : 'bg-green-100 text-green-700',
          icon : CheckCircle
      };

      case 'Rejected':
        return {
          color : 'bg-red-100 text-red-700',
          icon : XCircle
      };

      default: 
        return {
          color : 'bg-gray-100 text-gray-700',
          icon : Clock
      };

  }

}; 

const toggleFavourite = async (jobId, currentValue) => {

  try {

    const token = localStorage.getItem('token');

    await axios.put(
      `http://localhost:5000/api/jobs/${jobId}`,
      {
        isFavourite : !currentValue
      },
      {
        headers : {
          Authorization : `Bearer ${token}`
        }
      }
    );

    setJobs(prevJobs => 
      prevJobs.map(job => 
        job._id === jobId
        ? { ...job, isFavourite : !currentValue } : job
    )
  );
  }

  catch(error) {

    console.error(error);
  }
};

   return (
    <div className='min-h-screen bg-gradient-to-br from-blue-200 via-gray-100 to-indigo-300 px-8 pb-8 pt-3'>
      <motion.div 
      initial={{ opacity : 0, y : 40, scale : 0.95 }}
      animate={{ opacity : 1, y : 0, scale : 1 }}
      transition={{ duration : 0.5 }}
      className='max-w-7xl mx-auto'>

        <div className='sticky top-0 z-30 bg-white/90 backdrop-blur-md rounded-2xl shadow-md px-5 py-3 mb-8'>
          <div className='flex justify-between items-center mb-5'>

            <div className='flex items-center gap-5'>
              <Logo size='sm' />
        
              <div>
                <h1 className='text-3xl font-bold text-gray-800'>
                  JobPilot Dashboard
               </h1>

                <p className='mt-1 text-gray-500'>
                  Welcome, {user?.name}👋 
                </p>

                <p className='mt-1 text-gray-500'>
                  Track and manage all your job applications in one place.
                </p>
              </div>
            </div>

            <button onClick={handleLogout}
            className='bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition'>
              Logout
            </button>
          </div>
    
          <div className='flex flex-col md:flex-row gap-4 mb-8'>

            {/*Search*/}
            <div className='relative flex-1'>
              <input
              type='text'
              placeholder='Search by title, company or location...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className='w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'/>

              <Search size={20}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
            </div>

            {/*Sort*/}
            <select
            value={sortBy}
            onChange={(e) => {
            setSortBy(e.target.value)
            setCurrentPage(1);
          }}
            className='h-12 w-full md:w-60 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='newest'>Newest First</option>
            <option value='oldest'>Oldest First</option>
            <option value='company-asc'>Company (A-Z)</option>
            <option value='company-desc'>Company (Z-A)</option>
            <option value='salary-low'>Salary (Low to High)</option>
            <option value='salary-high'>Salary (High to Low)</option>
            </select>
        
            <select 
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className='h-12 w-full md:w-52 border border-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='All'>All Jobs</option>
            <option value='Full Time'>Full Time</option>
            <option value='Part Time'>Part Time</option>
            <option value='Internship'>Internship</option>
            <option value='Remote'>Remote</option>
            </select>

            <button
            onClick={() => setShowFavourite(!showFavourite)}
            className={`h-12 px-5 rounded-xl font-medium transition whitespace-nowrap ${
              showFavourite
              ? 'bg-yellow-500 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          ⭐ {showFavourite ? 'All Jobs' : 'Favourite Jobs'}
            </button>
          </div>
        </div>
      

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8'>

          { /*Total Jobs*/ }
          <div className='bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>
                  Total Jobs
                </p>

                <h2 className='text-3xl font-bold text-blue-600 mt-2'>
                  {jobs.length}
                </h2>
              </div>

              <div className='w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center'>
                <Briefcase size={28} className='text-blue-600' />
              </div>
            </div>

          </div>

          { /*Job Types*/ }
          <div className='bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>

              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-500 text-sm font-medium'>
                    Job Types
                  </p>

                  <h2 className='text-3xl font-bold text-green-600 mt-2'>
                    {new Set(jobs.map(job => job.jobType)).size}
                  </h2>
                </div>

                <div className='w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center'>
                  <Layers size={28} className='text-green-600'/>
                </div>
              </div>

          </div>


          { /*Companies*/ }
          <div className='bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Companies
                </p>

                <h2 className='text-3xl font-bold text-purple-600 mt-2'>
                  {new Set(jobs.map(job => job.company)).size}
                </h2>
              </div>

              <div className='w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center'>
                <Building2 size={28} className='text-purple-600'/>
              </div>
           </div>
          </div>

          { /*Applied Jobs*/ }
          <div className='bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Applied
                </p>

                <h2 className='text-3xl font-bold text-yellow-600 mt-2'>
                  {appliedJobs}
                </h2>
              </div>

              <div className='w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center'>
                <Clock size={28} className='text-yellow-600'/>
              </div>
              
            </div>
          </div>

          { /*Interview Jobs*/ }
          <div className='bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Interviews
                </p>

                <h2 className='text-3xl font-bold text-purple-600 mt-2'>
                  {interviewJobs}
                </h2>
              </div>

              <div className='w-14 h-14 rounded-2xl bg-purple-300 flex items-center justify-center'>
                <FileCheck size={28} className='text-purple-600' />
              </div>
            </div>
          </div>

          { /*Offers Jobs*/ }
          <div className='bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Offers
                </p>

                <h2 className='text-3xl font-bold text-green-600 mt-2'>
                  {offerJobs}
                </h2>
              </div>

              <div className='w-14 h-14 rounded-2xl bg-green-300 flex items-center justify-center'>
                <CheckCircle size={28} className='text-green-600' />
              </div>
            </div>
          </div>

        </div>

        <div className='flex justify-end mb-8'>
          <button 
          onClick={() => navigate('/create-job')}
          className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition'>
            + Create New Job
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>

          {filteredJobs.length === 0 ? (

            <div className='col-span-full bg-white rounded-xl shadow-md p-8 text-center'>

              {showFavourite ? (
                <>
                  <h2 className='text-2xl font-bold text-yellow-500'>
                    ⭐ No Favourite Jobs
                  </h2>

                  <p className='text-gray-500 mt-3'>
                    You haven't marked any jobs as favourite yet.
                  </p>
                </>

              ) : (

                <>

                  <h2 className='text-2xl font-bold text-gray-700'>
                    No jobs Found
                  </h2>

                  <p className='text-gray-500 mt-3'>
                    Create your first job to get started.
                  </p>
                </>
              )}

            </div>

          ) : (
        
            currentJobs.map((job) => {          
            return (
              <div 
              key={job._id}
              onClick={() => setSelectedJobDetails(job)}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer'>
          
              <div className='flex justify-between items-start mb-4'>
              { /*Left side*/ }
                <div className='flex-1'>
                  <h2 className='text-2xl font-bold text-gray-800 pr-4'>
                    {job.title}
                 </h2>

                <p className='text-lg text-gray-600 font-semibold mt-1'>
                  {job.company}
                </p>

              {(() => { 

                const { color, icon : StatusIcon } = getStatusConfig(job.status);

                return (
                  <span 
                  className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-sm font-medium ${color}`}
                  >
                    <StatusIcon size={15} />
                    {job.status}
                  </span>
                );
              })()}
            </div>

            
            <div className='flex items-center gap-1'>
              <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(job._id, job.isFavourite)
              }}
              className='p-2 rounded-lg hover:bg-yellow-100 transition'
              >
                <Star 
                size={20}
                className={ job.isFavourite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} />
                </button>


              { /*Right Side*/ }
              <DropDownMenu
              job={job}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onEdit={() => {
              navigate(`/edit-job/${job._id}`);
              setOpenMenu(null);
            }}
              onDelete={() => {
              setSelectedJob(job);
              setIsOpen(true);
              setOpenMenu(null);
            }}
            />
            </div>
          </div>

            <div className='mt-4'>
              <div className='flex flex-wrap gap-3'>
                <span className='flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>
                  <MapPin size={16} />
                  {job.location}
                </span>
              
                <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
                  💼 {job.jobType}
                </span>
              </div>

              <p className='mt-4 text-lg font-semibold text-gray-800'>  
                💰 ₹ {Number(job.salary).toLocaleString('en-IN')}
              </p>
            </div>
            </div>     
          );
        })
      )}
      </div>

      {totalPages > 1 && (
              <div className='flex justify-center items-center gap-2 mt-5'>
                <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-4 py-2 border rounded-lg disabled:opacity-50'>
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border hover:bg-gray-100'
                  }`}>
                    {index + 1}
                  </button>
                ))}

                <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-4 py-2 border rounded-lg disabled:opacity-50'>
                  Next
                </button>
              </div>
            )}

          
            <AnimatePresence>
            {selectedJobDetails && (
              <motion.div 
              className='fixed inset-0 bg-black/40 z-40'
              initial={{opacity : 0 }}
              animate={{ opacity : 1 }}
              exit={{ opacity : 0 }}
              onClick={() => setSelectedJobDetails(null)}>
                <motion.div
                onClick={(e) => e.stopPropagation()} 
                className='absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col'
                initial={{ x : '100%' }}
                animate={{ x : 0 }}
                exit={{ x : '100%' }}
                transition={{
                  duration : 0.35,
                  ease : 'easeInOut'
                }}>

                <div className='flex-1 overflow-y-auto p-6'>
                  <div className='flex justify-between items-center border-b pb-4'>

                    <h2 className='text-2xl font-bold'>
                      {selectedJobDetails.title}
                    </h2>

                    <button
                    onClick={() => setSelectedJobDetails(null)}
                    className='text-2xl hover:text-red-500 transition'>
                      ✕
                    </button>
                  </div>

                  <p className='text-lg text-gray-600 font-semibold mt-2'>
                    {selectedJobDetails.company}
                  </p>

                  <div className='mt-6 space-y-5 pb-8 '>

                  <div className='flex items-center gap-3'>
                    <MapPin size={20} className='text-blue-600' />
                    <div>
                      <h4 className='text-sm font-semibold text-gray-500'>Location</h4>
                        <p className='font-medium'>
                          {selectedJobDetails.location}
                        </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <Briefcase size={20} className='text-green-600' />
                    <div>
                      <h4 className='text-sm font-semibold text-gray-500'>Job Type</h4>
                      <p className='font-medium'>
                        {selectedJobDetails.jobType}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <IndianRupee size={20} className='text-purple-600' />
                    <div>
                      <h4 className='text-sm font-semibold text-gray-500'>Salary</h4>
                      <p>
                        ₹ {Number(selectedJobDetails.salary).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <CircleCheck size={20} className='text-orange-500' />
                    <div>
                      <h4 className='text-sm font-semibold text-gray-500'>Status</h4>
                      <p>{selectedJobDetails.status}</p>
                    </div>
                  </div>

                    <div className='mt-8 border-t pt-6'>
                      <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                        Job Desciption
                      </h3>
                      <p className='text-gray-700 leading-relaxed'>
                        {selectedJobDetails.description || 'No description available'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                    onClick={() => window.open(`http://localhost:5000/${selectedJobDetails.resume.replace(/\\/g, '/')}`,
                    '_blank'
                    )
                  }
                  className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition mb-5'>
                      📄 View Resume
                    </button>
                  </div>

                  <div className='border-t bg-white p-6'>
                    <div className='flex gap-3'>
                      <button
                      onClick={() => navigate(`/edit-job/${selectedJobDetails._id}`)}
                      className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition'>
                        Edit Job
                      </button>

                      <button
                      onClick={() => {
                        setSelectedJob(selectedJobDetails);
                        setIsOpen(true);
                        setSelectedJobDetails(null);
                      }}
                      className='flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition'>
                        Delete
                      </button>
                    </div>
                    </div>
                  </div>
                </motion.div>
                
                
              </motion.div>
            )}
            </AnimatePresence>

      </motion.div>

      <DeleteModal
      isOpen={isOpen}
      loading={deleteLoading}
      onClose={() => setIsOpen(false)}
      onConfirm={async() => {
        await handleDelete(selectedJob._id);
        setIsOpen(false);
      }}
      />

      <AIChatButtons 
      onclick={() => setIsChatOpen(true)}
      />

      {isChatOpen && (
        <AIChatWindow
        onclose={() => setIsChatOpen(false)} />
      )}
      </div>
    ); 
  };   

export default Dashboard;
