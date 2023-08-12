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
                    slug: "join-the-prisma-slack",
                    content: {
                        "blocks": [
                            {
                                "key": "a050g",
                                "text": "teste de texto um",
                                "type": "header-one",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            },
                            {
                                "key": "asfrn",
                                "text": "aaaaa",
                                "type": "unstyled",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            },
                            {
                                "key": "451r6",
                                "text": "taxi hey yeah",
                                "type": "unstyled",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            }
                        ],
                        "entityMap": {}
                    },
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
                    title: "Join the Prisma Slack",
                    slug: "draft-1",
                    content: {
                        "blocks": [
                            {
                                "key": "a050g",
                                "text": "teste de texto um",
                                "type": "header-one",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            },
                            {
                                "key": "asfrn",
                                "text": "aaaaa",
                                "type": "unstyled",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            },
                            {
                                "key": "451r6",
                                "text": "taxi hey yeah",
                                "type": "unstyled",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            }
                        ],
                        "entityMap": {}
                    },
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
                    title: "Join the Prisma Slack",
                    slug: "draft-2",
                    content: {
                        "blocks": [
                            {
                                "key": "a050g",
                                "text": "teste de texto um",
                                "type": "header-one",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            },
                            {
                                "key": "asfrn",
                                "text": "aaaaa",
                                "type": "unstyled",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            },
                            {
                                "key": "451r6",
                                "text": "taxi hey yeah",
                                "type": "unstyled",
                                "depth": 0,
                                "inlineStyleRanges": [],
                                "entityRanges": [],
                                "data": {}
                            }
                        ],
                        "entityMap": {}
                    },
                    published: true,
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
                bio: '',
                name: user.name,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                pronouns: "he/him",
            },

        })
        console.log(`Created user with id: ${user.id}, prfile with id: ${profile.id}`);
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
