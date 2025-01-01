import { Request, Response, NextFunction } from 'express';

import { ChatService } from '../../services/llm';
import { chatRequest, customChatRequest, APIResponse} from '../models';


export const routerTest = async (req: Request, res: Response): Promise<void> => {
	const response: APIResponse = {
		response: 'Hello World',
	};
	res.status(200).json(response);
};

export const chat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const data = chatRequest.parse(req.body);
		const llm = new ChatService(data.llmModel, data.llmVersion);
		const response: APIResponse = {
			response : await llm.invoke(data.input), 
		}; 
		res.status(200).json(response); 

	} catch (error) {
		next(error);
	}
};

export const customChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const data = customChatRequest.parse(req.body);
		const llm = new ChatService(data.llmModel, data.llmVersion);
		llm.costumChat(data.customChat);

		const response: APIResponse = {
			response:  await llm.invoke(data.input), 
		}; 
		res.status(200).json(response)
	} catch (error) {
		next(error);
	}
};
