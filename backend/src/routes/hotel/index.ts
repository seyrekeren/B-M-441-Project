import { Router } from 'express';
import {createHotel, deleteHotel, getAllHotel, updateHotel,  getSingleHotel, typeByCity, getHotelsByCityAndFiltersFromBody, getRoomsByPriceAndCapacityFromBody} from "../../controllers/hotel";
import { hotelAdminControl} from "../../middlewares/hotelAdmin-user";
const router: Router = Router();


router.post('/', hotelAdminControl, createHotel);
router.put('/:hotelId',hotelAdminControl,  updateHotel);
router.delete('/:hotelId', hotelAdminControl, deleteHotel);
router.get('/:hotelId', getSingleHotel);
router.get('/', getAllHotel);
router.get('/by-city/:city', typeByCity);
router.post('/filtered', getHotelsByCityAndFiltersFromBody);
router.post('/:hotelId/filtered-rooms', getRoomsByPriceAndCapacityFromBody);

export { router as hotelRouter };