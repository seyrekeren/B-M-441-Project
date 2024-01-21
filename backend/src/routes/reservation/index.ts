import { Router } from 'express';
import { createReservation} from "../../controllers/reservation";

const router: Router = Router();

router.post('/', createReservation);


export { router as reservationRouter };