import { Request, Response } from "express"
import { connection } from "../data/connection"

export async function getADeck(req: Request, res: Response): Promise<void> {
    try {
       const result = await connection("Deck")
       .select("*")
 
       res.status(200).send(result)
 
    } catch (error) {
       res.status(500).send("Internal server error")
    }
 }

