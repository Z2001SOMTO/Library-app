import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as BookService from './book.service';

export const bookRoute = express.Router();

// GET LIST all books
bookRoute.get("/", async(request: Request, response: Response) => {
    try {
        const books = await BookService.listBooks()
        return response.status(200).json(books)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
});

// GET A book based on the id
bookRoute.get("/:id", async(request: Request, response: Response) => {
    const id = parseInt(request.params.id, 10);
    try {
        const books = await BookService.getBook(id);
        if (books) {
            return response.status(200).json(books);
        }
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
});

//  POST : Create a new book 
bookRoute.post(
    "/",
     body("title").isString(),
     body("authoeId").isInt(),
     body("datePublished").isDate().toDate(), 
     body("isFiction").isBoolean(),
     async(request: Request, response: Response) => {
        const error = validationResult(request)
        if (error.isEmpty()) {
            return response.status(400).json({error: error.array()});
        }
        try {
            const book = request.body;
            const newBook = await BookService.createBook(book);
            return response.status(201).json(newBook);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
     }
     );

//  PUT : Update a book 
bookRoute.put(
    "/:id",
     body("title").isString(),
     body("authoeId").isInt(),
     body("datePublished").isDate().toDate(), 
     body("isFiction").isBoolean(),
     async(request: Request, response: Response) => {
        const error = validationResult(request)
        if (error.isEmpty()) {
            return response.status(400).json({error: error.array()});
        }
        const id: number = parseInt(request.params.id, 10);
        try {
            const book = request.body;
            const updateBook = await BookService.updateBook(book, id);
            return response.status(201).json(updateBook);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
     }
     );

 // DELETE: delete a book 
bookRoute.delete("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        await BookService.deleteBook(id);
        return response.status(204).json("Book as been deleted");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});  