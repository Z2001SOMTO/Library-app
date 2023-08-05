import { db } from "../src/utils/db.server";

type Author = {
    firstName: string;
    lastName: string;
};

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
};

async function seed() {
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.firstName,
                },
            });
        }) 
    );
    const author = await db.author.findFirst({
        where: {
            firstName: "Chimamanda Ngozi",
        },
    });
    
    await Promise.all(
        getBooks().map((book) => {
            const { title, isFiction, datePublished } = book;
            return db.book.create({
                data: {
                  title,
                  isFiction,
                  datePublished,
                  authorId: author!.id,  
                },
            });
        })
    );
    
}

seed();

function getAuthors(): Array<Author> {
    return [
        {
            firstName: "Somto",
            lastName: "Eze",
        },
        {
            firstName: "Ebuka",
            lastName: "Odenigbo",
        },
        {
            firstName: "Chimamanda Ngozi",
            lastName: "Adichie",
        },
    ];
}

function getBooks(): Array<Book> {
    return [
        {
            title: "Half of a Yellow Sun",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "Imitation",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "Purple Hibiscus",
            isFiction: true,
            datePublished: new Date(),
        },
    ]
}