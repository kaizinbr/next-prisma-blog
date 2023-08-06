import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from 'bcrypt'

async function encryptPass(pass: string) {
    const salt = await hash(pass, 12)
    return salt
}

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Alice",
        username: "alice",
        password: "alice",
        email: "alice@prisma.io",
        posts: {
            create: [
                {
                    title: "Join the Prisma Slack",
                    content: "https://slack.prisma.io",
                    published: true,
                },
            ],
        },
    },
    {
        name: "Nilu",
        username: "nilu",
        password: "nilu",
        email: "nilu@prisma.io",
        posts: {
            create: [
                {
                    title: "Follow Prisma on Twitter",
                    content: "https://www.twitter.com/prisma",
                    published: true,
                },
            ],
        },
    },
    {
        name: "Mahmoud",
        username: "mahmoud",
        password: "mahmoud",
        email: "mahmoud@prisma.io",
        posts: {
            create: [
                {
                    title: "Ask a question about Prisma on GitHub",
                    content: "https://www.github.com/prisma/prisma/discussions",
                    published: true,
                },
                {
                    title: "Prisma on YouTube",
                    content: "https://pris.ly/youtube",
                },
            ],
        },
    },
];

const categoryData: Prisma.CategoryCreateInput[] = [
    {
        name: "Category 1",
    },
    {   
        name: "Category 2",
    },
    {
        name: "Category 3",
    },
    {
        name: "Category 4",
    }
]


async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const user = await prisma.user.create({
            data: {
                username: u.username,
                name: u.name,
                email: u.email,
                password: await encryptPass(u.password),
                posts: {
                    create: u.posts?.create,
                },
            },
        });
        const profile = await prisma.profile.create({
            data: {
                bio: "I like turtles.",
                name: user.name,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },

        })
        console.log(`Created user with id: ${user.id}`);
    }

    for (const c of categoryData) {
        const category = await prisma.category.create({
            data: {
                name: c.name,
            },
        });
        console.log(`Created category with id: ${category.id}`);
    }

    await prisma.todo.create({
        data: {
            title: "Learn Next.js",
        },
    });
    await prisma.todo.create({
        data: {
            title: "Learn Prisma",
        },
    });
    await prisma.todo.create({
        data: {
            title: "Learn GraphQL",
        },
    });
    console.log(`Seeding finished.`);
}



main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
