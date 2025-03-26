import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { getOneToOneMessageChatList, getUsersForSideBar } from "../controller/messageController.js";

const messageRouter = Router();

messageRouter.get('/users', verifyJWT, getUsersForSideBar)

messageRouter.get('/:id', verifyJWT, getOneToOneMessageChatList)

export default messageRouter