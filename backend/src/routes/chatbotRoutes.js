import express from'express';
import  ChatController from'../controllers/chatbotController.js';


const router = express.Router();
// const chatController = new ChatController();

router.post('chatbot/', (req, res) => {
    console.log('Inside chatRoutes.js , Response : ' , req.body);
    ChatController.sendMessage(req, res);
});

export default router;


