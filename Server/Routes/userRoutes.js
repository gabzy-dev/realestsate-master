import express from "express";
import {createUser} from "../Controller/userController.js"
import { bookVisit } from "../Controller/userController.js";
import {getAllBookings} from "../Controller/userController.js"
import { cancelBooking } from "../Controller/userController.js";
import { toFav } from "../Controller/userController.js";
import { toGetAllFav } from "../Controller/userController.js";
import jwtCheck from "../Config/auth0Config.js";

const router = express.Router()

router.post("/register",jwtCheck, createUser)
router.post("/bookVisit/:id",jwtCheck, bookVisit)
router.post("/allBookings",jwtCheck, getAllBookings)
router.post("/removeBooking/:id",jwtCheck,cancelBooking)
router.post("/toFav/:rid",jwtCheck,toFav)
router.post("/allFav",jwtCheck,toGetAllFav)

export{router as userRoute}