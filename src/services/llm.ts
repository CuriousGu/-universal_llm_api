import { ChatOpenAI } from "@langchain/openai";
// import { Ollama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Runnable } from "@langchain/core/runnables";

import * as dotenv from 'dotenv';

import { getPrompt } from "../database/mongodb/utils";


dotenv.config();


export class ChatService {
	model!: ChatOpenAI;
	chain: Runnable | null = null;

	constructor(modelName: string, modelVersion: string){
		try{
			if (modelName === "openai"){
				this.model = new ChatOpenAI({
					model: modelVersion,
					temperature: 0.1, 
					openAIApiKey: process.env.OPENAI_API_KEY
				});
			} else {
				throw new Error("Invalid model name");
			}
		} catch (error){
			throw new Error("Invalid model name"); //ajustar tratamento de erros
		}
	}

	costumChat(chatName: string): void{
		const prompt: string = getPrompt(chatName);
		const template = ChatPromptTemplate.fromMessages([
			["system", prompt],
			["human", "{message}"]
		]);
		this.chain = template.pipe(this.model);
	}

	async invoke(userInput: string): Promise<string> {
		let result;
		if (this.chain){
			result = await this.chain.invoke({
				message: userInput,
			});
		} else { 
			result = await this.model.invoke(userInput);
		}
		return result.content; 
	}
}
