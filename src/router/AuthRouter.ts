import express from 'express'
import DefaultAuth from '../controller/DefaultAuth'
import SocialAuth from '../controller/SocialAuth'

const router = express.Router()

router.post('/registration', DefaultAuth.registration)
router.post('/login', DefaultAuth.login)
router.post('/socialauth', SocialAuth.socialAuth)

export default router
