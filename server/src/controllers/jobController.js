const Job = require('../models/Job');

const createJob = async (req, res) => {

    try {

    const { title, company, location, salary, jobType, status, description } = req.body;

    const resume = req.file ? req.file.path : '';

    if(!title || !company || !location || !salary || !jobType || !description) {
        return res.status(400).json({
        message : 'Please fill all required fields'
        });
    }

        const job = await Job.create({
         title,
         company,
         location,
         salary,
         jobType,
         status,
         description,
         resume,
         createdBy : req.user.id
    });

        res.status(201).json({
         success : true,
         message : 'Job Created Successfully',
         job
    });
}
catch(error) {

    console.error('Create Job error:', error);

    res.status(500).json({
        success : false,
        message : error.message
    });
}
};

const getJobs = async (req, res) => {

    console.log('GETS JOBS CONTROLLER HIT');
    
    try {

        console.log('logged in user:', req.user.id);

        const jobs = await Job.find({
            createdBy : req.user.id
        });

        console.log('Jobs Found:', jobs.length);

        res.status(200).json({
            success : true,
            count : jobs.length,
            jobs
        });
    }
    catch(error) {
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        });
    }

};

const getJobById = async (req, res) => {

    try { 

        const { id } = req.params;

        const job = await Job.findById(id); 

        if(!job) {
            return res.status(404).json({
                success : false,
                message : 'Job not found'
            });
        } 

                if(job.createdBy.toString() !== req.user.id) {
                    return res.status(403).json({
                        success : false,
                        message : 'Not authorized to view this job'
                    });
                }

                    return res.status(200).json({
                        success : true,
                        job
                    });
                }
        
                catch(error) {
                    res.status(500).json({
                    success : false,
                    message : 'Internal server error'
        });
    }
}

const updateJob = async(req, res) => {

    try {

        const { id } = req.params;

        //Find the job
        const job = await Job.findById(id);

        //did the user upload new resume if yes then req.file.path if no then job.resume(means keep old resume)
        const resume = req.file ? req.file.path : job.resume;

        //Check if job exists
        if(!job) {
            return res.status(404).json({
                success : false,
                message : 'Job not found'
            });
        }

        //Check if logged-in user is the owner
        if(job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success : false,
                message : 'Not authorized to view this job'
            });
        }

        //Update the job
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            {
            ...req.body,
            resume
            },
            {
                new : true,                   //return the updated document
                runValidators : true          //make sure the updated data follows the schema
            }
        );
        
        //Send response
        res.status(200).json({
            success : true,
            message : 'Job updated successfully',
            job : updatedJob
        });

    }

        catch(error) {
            return res.status(500).json({
                success : false,
                message : 'Internal server error'
            });
        }
    };

    const deleteJob = async(req, res) => {

        try {

            const { id } = req.params;

            //Find job
            const job = await Job.findById(id);

            //Check if job exists
            if(!job) {
                return res.status(404).json({
                    success : false,
                    message : 'Job not found'
                });
            }

            //Check ownership
            if(job.createdBy.toString() !== req.user.id) {
                return res.status(403).json({
                    success : false,
                    message : 'Not authorized'
                });
            }

            //Delete Job
            await job.deleteOne();

            //Send success response
            return res.status(200).json({
                success : true,
                message : 'Job Deleted Successfully'
            });
        }

        catch(error) {

            return  res.status(500).json({
                success : false,
                message : 'Internal server error'
            });
        }
    };

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob } ;