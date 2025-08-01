
    // constructor() {
    //     this.groqService = require('../services/groqService');
    // }

import groqservice from '../services/chatbotservice.js';

const  sendMessage = async (req, res)=> {
    const { message } = req.body;
    if(!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        const response = await groqservice.sendMessage(message);
        console.log("Response being sent to frontend:", response);
        res.json(response);

    } catch (error) {
        console.log("Controller , Error sending message:", error);
        res.status(500).json({ error: error.message });
    }
}


export default sendMessage;
