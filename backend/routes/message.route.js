import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { getOneToOneMessageChatList, getUsersForSideBar, sendMessage } from "../controller/messageController.js";

const messageRouter = Router();

messageRouter.get('/users', verifyJWT, getUsersForSideBar)

messageRouter.get('/:id', verifyJWT, getOneToOneMessageChatList)

messageRouter.post('/send/:id', verifyJWT, sendMessage)

export default messageRouter