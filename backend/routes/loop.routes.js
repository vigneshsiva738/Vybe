import express from "express"
import isAuth from "../middlewares/isAuth.js"

import { upload } from "../middlewares/multer.js"
import { comment, getAllLoops, like, uploadLoop } from "../controllers/loop.controllers.js"



const loopRouter=express.Router()

loopRouter.post("/upload",isAuth,upload.single("media"),uploadLoop)
loopRouter.get("/getAll",isAuth,getAllLoops)
loopRouter.get("/like/:loopId",isAuth,like)

loopRouter.post("/comment/:loopId",isAuth,comment)

export default loopRouter