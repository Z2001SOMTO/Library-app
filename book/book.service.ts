import { db } from "../src/utils/db.server";
import type { Author } from "../src/author/author.service";

type BookRead = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    author: Author;
    // authorId: number;
};

type BookWrite = {
    title: string;
    datePublished: Date;
    isFiction: boolean;
    authorId: number;
}

export const listBooks = async(): Promise<BookRead[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            // authorId: true
        },
    });
};

export const getBook = async(id: number): Promise<BookRead | null> => {
    return db.book.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
};

export const createBook = async(book: BookWrite): Promise<BookRead> => {
    const { title, authorId, isFiction, datePublished } = book;
    const parsedDate: Date = new Date(datePublished);

    return db.book.create({
        data: {
            title,
            authorId,
            isFiction,
            datePublished: parsedDate,
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
};

export const updateBook = async (book: BookWrite, id: number): Promise<BookRead> => {
    const { title, authorId, isFiction, datePublished } = book;
    return db.book.update({
        where: {
            id,
        },
        data: {
            title,
            authorId,
            isFiction,
            datePublished,
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
};

export const deleteBook = async (id: number): Promise<void> => {
    await db.book.delete({
        where: {
            id,
        },
    });
};