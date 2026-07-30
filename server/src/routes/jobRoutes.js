const express = require('express');
const router = express.Router();

const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');

//Only a logged-in user should be able to create a job
const protect = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');


//When a POST request comes to /, first run the protect, then runs createJob.
router.post('/', protect, upload.single('resume'), createJob);

router.get('/', protect, getJobs);

router.get('/:id', protect, getJobById);

router.put('/:id', protect, upload.single('resume'),  updateJob);

router.delete('/:id', protect, deleteJob);

module.exports = router;    