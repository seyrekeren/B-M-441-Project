import { Router } from 'express';
import {createFlight, deleteFlight, getAllFlights, getFlight, updateFlight, getFlightsByCitiesFromBody} from "../../controllers/flight";
import {hotelAdminControl } from "../../middlewares/hotelAdmin-user";
const router: Router = Router();

router.post('/', hotelAdminControl, createFlight);
router.delete('/:flighId',hotelAdminControl, deleteFlight);
router.get('/', getAllFlights);
router.get('/:flightId', getFlight);
router.put('/:flightId',hotelAdminControl, updateFlight);
router.post('/filtered', getFlightsByCitiesFromBody)

export { router as flightRouter };