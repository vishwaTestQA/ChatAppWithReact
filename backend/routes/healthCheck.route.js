import { Router } from "express";
import { healtchCheckController } from "../controller/healthCheckController.js";

const healthRoute = Router()

healthRoute.get('/isConnected', healtchCheckController)

export default healthRoute