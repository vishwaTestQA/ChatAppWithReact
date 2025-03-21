import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { getUsersForSideBar } from "../controller/messageController.js";

const messageRouter = Router();

messageRouter.get('/users', verifyJWT, getUsersForSideBar)

// messageRouter.get('users/:id', verifyJWT, getOneToOneMessageChatList)

export default messageRouter