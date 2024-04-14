import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcrypt";

async function encryptPass(pass: string) {
    const salt = await hash(pass, 12);
    return salt;
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
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nulla, rutrum vitae finibus a, rhoncus vitae elit. Duis ipsum augue, tincidunt in est et, placerat iaculis elit. Quisque tempus purus elit, id faucibus nisl tincidunt id. Sed ac dui congue, vestibulum risus quis, viverra arcu.",
                    mediaURL: [
                        ""
                    ],
                    userId: '1',
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
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nulla, rutrum vitae finibus a, rhoncus vitae elit. Duis ipsum augue, tincidunt in est et, placerat iaculis elit. Quisque tempus purus elit, id faucibus nisl tincidunt id. Sed ac dui congue, vestibulum risus quis, viverra arcu.",
                    mediaURL: [
                        ""
                    ],
                    userId: '1',
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
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nulla, rutrum vitae finibus a, rhoncus vitae elit. Duis ipsum augue, tincidunt in est et, placerat iaculis elit. Quisque tempus purus elit, id faucibus nisl tincidunt id. Sed ac dui congue, vestibulum risus quis, viverra arcu.",
                    mediaURL: [
                        ""
                    ],
                    userId: '1',
                },
            ],
        },
    },
    {
        name: "Hueningie",
        username: "molangkkyun",
        password: "123",
        email: "hueningie@molang.com",
        posts: {
            create: [
                {
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nulla, rutrum vitae finibus a, rhoncus vitae elit. Duis ipsum augue, tincidunt in est et, placerat iaculis elit. Quisque tempus purus elit, id faucibus nisl tincidunt id. Sed ac dui congue, vestibulum risus quis, viverra arcu.",
                    mediaURL: [
                        ""
                    ],
                    userId: '1',
                },
            ],
        },
        Profile: {
            create: {
                bio: "*cutie tone* hello, i'm hueningie!",
                name: "Hueningie",
                pronouns: "he/him",
                color: "#FFB627",
                image: "/static/images/hyuka.gif",
            },
        },
    },
    {
        name: "Kang Terry",
        username: "sexysquirrel",
        password: "123",
        email: "terryun@mail.com",
        posts: {
            create: [
                {
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nulla, rutrum vitae finibus a, rhoncus vitae elit. Duis ipsum augue, tincidunt in est et, placerat iaculis elit. Quisque tempus purus elit, id faucibus nisl tincidunt id. Sed ac dui congue, vestibulum risus quis, viverra arcu.",
                    mediaURL: [
                        ""
                    ],
                    userId: '1',
                },
            ],
        },
        Profile: {
            create: {
                bio: "Eae",
                name: "Kang Terry",
                pronouns: "he/him",
                color: "#363636",
                image: "/static/images/taehyun.webp",
            },
        },
    },
    {
        name: "Mr. Junnie",
        username: "itboyjunnie",
        password: "123",
        email: "peaceandluxurybrands@mail.com",
        posts: {
            create: [
                {
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nulla, rutrum vitae finibus a, rhoncus vitae elit. Duis ipsum augue, tincidunt in est et, placerat iaculis elit. Quisque tempus purus elit, id faucibus nisl tincidunt id. Sed ac dui congue, vestibulum risus quis, viverra arcu.",
                    mediaURL: [
                        ""
                    ],
                    userId: '1',
                },
            ],
        },
        Profile: {
            create: {
                bio: "quero ver todos felizes e saudáveis😊",
                name: "Mr. Junnie",
                pronouns: "do/soobin",
                color: "#8D6B94",
                image: "/static/images/yeonjun.webp",
            },
        },
    },
    {
        name: "Choi Soobin",
        username: "page.soobin",
        password: "123",
        email: "gamerbin@mail.com",
        posts: {
            create: [
                {
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nulla, rutrum vitae finibus a, rhoncus vitae elit. Duis ipsum augue, tincidunt in est et, placerat iaculis elit. Quisque tempus purus elit, id faucibus nisl tincidunt id. Sed ac dui congue, vestibulum risus quis, viverra arcu.",
                    mediaURL: [
                        ""
                    ],
                    userId: '1',
                },
            ],
        },
        Profile: {
            create: {
                bio: "choi odi 🫶🏻🤍",
                name: "Choi Soobin",
                pronouns: "he/him",
                color: "#BF8B85",
                image: "/static/images/soobin.webp",
            },
        },
    },
    {
        name: "Beomgyu",
        username: "racergyu",
        password: "123",
        email: "lovetoto@mail.com",
        posts: {
            create: [
                {
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante nulla, rutrum vitae finibus a, rhoncus vitae elit. Duis ipsum augue, tincidunt in est et, placerat iaculis elit. Quisque tempus purus elit, id faucibus nisl tincidunt id. Sed ac dui congue, vestibulum risus quis, viverra arcu.",
                    mediaURL: [
                        ""
                    ],
                    userId: '1',
                },
            ],
        },
        Profile: {
            create: {
                bio: "😎",
                name: "Beomgyu",
                pronouns: "ador/able",
                color: "#FFA69E",
                image: "/static/images/beomgyu.webp",
            },
        },
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const user = await prisma.user.create({
            data: {
                username: u.username,
                name: u.name,
                email: u.email,
                password: await encryptPass(u.password),
                // posts: {
                //     create: u.posts?.create,
                // },
                Profile: {
                    create: u.Profile?.create,
                },
            },
        });
        // const profile = await prisma.profile.create({
        //     data: {
        //         bio: "",
        //         name: user.name,
        //         user: {
        //             connect: {
        //                 id: user.id,
        //             },
        //         },
        //         pronouns: "he/him",
        //     },
        // });
        console.log(
            `Created user and profile! Id: ${user.id}`
        );
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
