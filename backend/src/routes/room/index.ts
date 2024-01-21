import { Router } from 'express';
import {createRoom, listRooms, deleteRoom , getRoom} from "../../controllers/room";
import { hotelAdminControl } from '../../middlewares/hotelAdmin-user';

const router: Router = Router();

router.post('/:hotelId', hotelAdminControl, createRoom);
router.get('/:hotelId', listRooms);
router.delete('/:hotelId/:roomId', deleteRoom);
router.get('/:hotelId/:roomId', getRoom);

export { router as roomRouter };