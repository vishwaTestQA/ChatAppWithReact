import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import { getUsersForSideBar } from "../controller/message.controller";

const router = Router();

router.get('/users', verifyJWT, getUsersForSideBar)

router.get('users/:id', verifyJWT, getOneToOneMessageChatList)

export default router