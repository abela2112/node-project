const express=require('express')
const router=express.Router()

const {
    getAllJobs,
    getSIngleJobs,
    createJobs,
    updateJobs,
    deleteJobs
}=require('../controllers/jobs')

router.route('/').get(getAllJobs).post(createJobs)
router.route('/:id').get(getSIngleJobs).patch(updateJobs).delete(deleteJobs)
module.exports=router
