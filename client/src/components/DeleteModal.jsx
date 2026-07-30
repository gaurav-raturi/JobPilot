import React from 'react'
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, loading}) => {

    if(!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
        <motion.div 
        initial={{ opacity : 0, scale : 0.9, y : -20}}
        animate={{ opacity : 1, scale : 1, y : 0}}
        exit={{ opacity : 0, scale : 0.9, y : -20}}
        transition={{ duration : 0.25 }}
        className='bg-white rounded-2xl shadow-2xl w-full max-w-md p-8'>
            <div className='flex justify-center'>
                <div className='w-16 h-16 rounded-full bg-red-100 flex items-center justify-center'>
                    <Trash2 size={30} className='text-red-600' />
                </div>
            </div>

            <h2 className='text-2xl font-bold text-gray-800 text-center mt-6'>
                Delete Job
            </h2>

            <p className='text-gray-500 text-center mt-3'>
                Are you sure you want to delete this job?
                This action cannot be undone.
            </p>

            <div className='flex justify-center gap-4 mt-8'>
                <button 
                onClick={onClose}
                disabled={loading}
                className='px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200'>
                    Cancel
                </button>

                <button 
                onClick={onConfirm}
                disabled={loading}
                className='px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 hover:shadow-xl active:scale-95 transition-all duration-200'>
                    {loading ? (
                        <span className='flex items-center gap-2'>
                            <Loader2 size={18} className='animate-spin' />
                            Deleting...
                        </span>
                    ) : (
                        'Delete Job'
                    )}
                </button>
            </div>

        </motion.div>
      
    </div>
  )
}

export default DeleteModal;
