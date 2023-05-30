import express from 'express'
import usersController from './users.controller'

const router = express.Router()

router.post('/create-user', usersController.createUserControl)

export default router
