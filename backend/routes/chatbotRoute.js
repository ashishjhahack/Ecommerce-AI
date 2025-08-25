import express from 'express'
import { chatbotReply } from '../controllers/chatbotController.js'

const chatbotRouter = express.Router()

// Define your routes here
chatbotRouter.post('/chat', chatbotReply)


export default chatbotRouter