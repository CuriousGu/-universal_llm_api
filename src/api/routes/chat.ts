import { Router } from 'express';
import { chat, customChat, routerTest } from '../controllers';


export const router = Router();

router.get('/', routerTest)
router.post('/chat', chat);
router.post('/custom_chat', customChat);
