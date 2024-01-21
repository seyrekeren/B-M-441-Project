import {Router} from "express";

import { authRouter } from "./auth";
import { hotelRouter } from "./hotel";
import { roomRouter } from "./room";
import { flightRouter } from "./flight";
import { reservationRouter } from "./reservation";

import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/hotels', currentUser, requireAuth, hotelRouter);
router.use('/room', currentUser, requireAuth, roomRouter);
router.use('/flight', currentUser, requireAuth, flightRouter);
router.use('/reservation', currentUser, requireAuth, reservationRouter);

export default router;