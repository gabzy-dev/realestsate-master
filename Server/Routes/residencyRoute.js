import express from "express";
import { createResidency } from "../Controller/residencyController.js";
import { getAllResidencies } from "../Controller/residencyController.js";
import { getResidency } from "../Controller/residencyController.js";
import jwtCheck from "../Config/auth0Config.js";

const router = express.Router()

 router.post("/create",jwtCheck,createResidency)
 router.get("/allresd",getAllResidencies )
 router.get("/:id",getResidency)
 

 export {router as residencyRoute}