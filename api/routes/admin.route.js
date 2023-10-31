import express from 'express'
import { fetchAllUsers } from '../controllers/admin.controller.js'

const router = express.Router()

router.get("/users",fetchAllUsers)

export default router