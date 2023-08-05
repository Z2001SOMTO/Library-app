import express from 'express';
import type { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthorService from './author.service';

export const authorRouter = express.Router();

// GET: List of All Authors
authorRouter.get("/", async (requset: Request, response: Response) => {
    try {
        const authors = await AuthorService.listAuthors()
        return response.status(200).json(authors);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// GET: A single Author by ID
authorRouter.get("/:id", async (requset: Request, response: Response) => {
    const id = parseInt(requset.params.id, 10);
    try {
        const author = await AuthorService.getAuthor(id);
        if (author) {
            return response.status(200).json(author);
        }
        return response.status(404).json("Author not found");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// POST: Create a Author
// Params: firstName and lastName
authorRouter.post(
    "/",
     body("firstName").isString(),
     body("lasName").isString(),
     async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if(errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        try {
            const author = request.body
            const newAuthor = await AuthorService.createAuthor(author)
            return response.status(201).json(newAuthor);
        } catch (error: any) {
            return response.status(500).json(error.message);  
        };
     }
     );

// PUT: Update an Author
// Params: firstName and lastName  
authorRouter.put(
    "/:id",
     body("firstName").isString(),
     body("lasName").isString(),
     async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if(errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        const id: number = parseInt(request.params.id, 10);
        try {
            const author = request.body
            const updatedAuthor = await AuthorService.updateAuthor(author, id);
            return response.status(200).json(updatedAuthor)
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
     }
);     
// DELETE: Delete an author based on the id of the author
authorRouter.delete("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        await AuthorService.deleteAuthor(id);
        return response.status(204).json("Author has been deleted");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});