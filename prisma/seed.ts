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
                    title: "Join the Prisma Slack",
                    slug: "join-the-prisma-slack",
                    json: {
                        blocks: [
                            {
                                key: "a050g",
                                text: "teste de texto um",
                                type: "header-one",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                            {
                                key: "asfrn",
                                text: "aaaaa",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                            {
                                key: "451r6",
                                text: "taxi hey yeah",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                        ],
                        entityMap: {},
                    },
                    html: "<p>teste de texto um</p><p>aaaaa</p><p>taxi hey yeah</p>",
                    published: true,
                    serifed: true,
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
                    subtitle: "subtitle",
                    slug: "draft-1",
                    json: {
                        blocks: [
                            {
                                key: "a050g",
                                text: "teste de texto um",
                                type: "header-one",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                            {
                                key: "asfrn",
                                text: "aaaaa",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                            {
                                key: "451r6",
                                text: "taxi hey yeah",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                        ],
                        entityMap: {},
                    },
                    published: true,
                    serifed: true,
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
                    subtitle: "subtitle",
                    slug: "draft-2",
                    json: {
                        blocks: [
                            {
                                key: "a050g",
                                text: "teste de texto um",
                                type: "header-one",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                            {
                                key: "asfrn",
                                text: "aaaaa",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                            {
                                key: "451r6",
                                text: "taxi hey yeah",
                                type: "unstyled",
                                depth: 0,
                                inlineStyleRanges: [],
                                entityRanges: [],
                                data: {},
                            },
                        ],
                        entityMap: {},
                    },
                    published: true,
                    serifed: true,
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
                    title: "Motivos pelos quais deveriamos parar de fazer terapia e usar a barriga do Soobin hyung como almofada",
                    subtitle: "Primeiro, temos que entender a psicologia por trás disso. Começamos",
                    slug: "binnie-hyung-belly-pillow",
                    json: {
                        type: "doc",
                        content: [
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Desde sua estreia, o Tomorrow X Together, mais conhecido como ",
                                        type: "text",
                                    },
                                    {
                                        text: "TXT",
                                        type: "text",
                                        marks: [
                                            {
                                                type: "link",
                                                attrs: {
                                                    href: "https://ibighit.com/txt/eng/",
                                                    class: null,
                                                    target: "_blank",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        text: ", tem cativado corações com sua música única e inovadora. Cada álbum lançado é uma obra-prima que reflete a evolução artística e criativa do grupo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Lore Intrigante:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                ],
                            },
                            {
                                type: "blockquote",
                                content: [
                                    {
                                        type: "paragraph",
                                        attrs: { textAlign: "left" },
                                        content: [
                                            {
                                                text: "Uma das características mais notáveis da discografia do TXT é a construção cuidadosa da lore em seus álbuns. Através de elementos visuais, musicais e narrativos, eles criam universos coesos que interligam todas as faixas e álbuns. Essa narrativa transmídia não apenas envolve os fãs, mas também permite uma experiência imersiva única.",
                                                type: "text",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Representação da Geração Z:",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: " Os ", type: "text" },
                                    {
                                        text: "álbuns",
                                        type: "text",
                                        marks: [{ type: "code" }],
                                    },
                                    {
                                        text: ' do TXT são um reflexo sincero dos sentimentos, lutas e sonhos da geração Z. Suas letras abordam questões como autoaceitação, pressões sociais e busca de identidade. Através de músicas como "',
                                        type: "text",
                                    },
                                    {
                                        text: "Blue Hour",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: '" e "', type: "text" },
                                    {
                                        text: "21st Century Girl",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    {
                                        text: '", eles capturam os altos e baixos emocionais pelos quais muitos jovens passam.',
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Liderança na 4ª Geração:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                    {
                                        text: " Não se pode falar da 4ª geração do K-pop sem mencionar o TXT. Com sua musicalidade inovadora, coreografias marcantes e performances carismáticas, eles se estabeleceram como líderes incontestáveis dessa nova onda do gênero. Seu impacto vai além das fronteiras coreanas, conquistando fãs ao redor do mundo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Em conclusão, a discografia do TXT transcende simplesmente a música, mergulhando em narrativas profundas e representações genuínas da geração Z. Seu papel como líderes na 4ª geração do K-pop é evidente, cativando fãs e deixando uma marca indelével na indústria musical.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 1, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 1", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 2, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 2", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 3, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 3", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 4, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 4", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 5, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 5", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 6, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 6", type: "text" },
                                ],
                            },
                        ],
                    },
                    published: true,
                    serifed: false,
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
                    title: "Uma rotina de treinos para o corpo todo que você pode fazer em casa",
                    subtitle: "Com a vida corrida, nem sempre conseguimos ir à academia. Mas isso não é desculpa para deixar de se exercitar. Com apenas alguns minutos por dia, você pode fazer uma rotina de treinos para o corpo todo em casa. Confira abaixo alguns exercícios que você pode fazer sem equipamentos.",
                    slug: "treino-em-casa",
                    json: {
                        type: "doc",
                        content: [
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Desde sua estreia, o Tomorrow X Together, mais conhecido como ",
                                        type: "text",
                                    },
                                    {
                                        text: "TXT",
                                        type: "text",
                                        marks: [
                                            {
                                                type: "link",
                                                attrs: {
                                                    href: "https://ibighit.com/txt/eng/",
                                                    class: null,
                                                    target: "_blank",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        text: ", tem cativado corações com sua música única e inovadora. Cada álbum lançado é uma obra-prima que reflete a evolução artística e criativa do grupo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Lore Intrigante:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                ],
                            },
                            {
                                type: "blockquote",
                                content: [
                                    {
                                        type: "paragraph",
                                        attrs: { textAlign: "left" },
                                        content: [
                                            {
                                                text: "Uma das características mais notáveis da discografia do TXT é a construção cuidadosa da lore em seus álbuns. Através de elementos visuais, musicais e narrativos, eles criam universos coesos que interligam todas as faixas e álbuns. Essa narrativa transmídia não apenas envolve os fãs, mas também permite uma experiência imersiva única.",
                                                type: "text",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Representação da Geração Z:",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: " Os ", type: "text" },
                                    {
                                        text: "álbuns",
                                        type: "text",
                                        marks: [{ type: "code" }],
                                    },
                                    {
                                        text: ' do TXT são um reflexo sincero dos sentimentos, lutas e sonhos da geração Z. Suas letras abordam questões como autoaceitação, pressões sociais e busca de identidade. Através de músicas como "',
                                        type: "text",
                                    },
                                    {
                                        text: "Blue Hour",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: '" e "', type: "text" },
                                    {
                                        text: "21st Century Girl",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    {
                                        text: '", eles capturam os altos e baixos emocionais pelos quais muitos jovens passam.',
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Liderança na 4ª Geração:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                    {
                                        text: " Não se pode falar da 4ª geração do K-pop sem mencionar o TXT. Com sua musicalidade inovadora, coreografias marcantes e performances carismáticas, eles se estabeleceram como líderes incontestáveis dessa nova onda do gênero. Seu impacto vai além das fronteiras coreanas, conquistando fãs ao redor do mundo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Em conclusão, a discografia do TXT transcende simplesmente a música, mergulhando em narrativas profundas e representações genuínas da geração Z. Seu papel como líderes na 4ª geração do K-pop é evidente, cativando fãs e deixando uma marca indelével na indústria musical.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 1, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 1", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 2, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 2", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 3, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 3", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 4, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 4", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 5, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 5", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 6, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 6", type: "text" },
                                ],
                            },
                        ],
                    },
                    published: true,
                    serifed: false,
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
                    title: "Músicas que eu gostaria de dançar um dia",
                    subtitle: "fiz essa lista e queria compartilhar aqui",
                    slug: "musicas-que-eu-gostaria-de-dancar-um-dia",
                    json: {
                        type: "doc",
                        content: [
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Desde sua estreia, o Tomorrow X Together, mais conhecido como ",
                                        type: "text",
                                    },
                                    {
                                        text: "TXT",
                                        type: "text",
                                        marks: [
                                            {
                                                type: "link",
                                                attrs: {
                                                    href: "https://ibighit.com/txt/eng/",
                                                    class: null,
                                                    target: "_blank",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        text: ", tem cativado corações com sua música única e inovadora. Cada álbum lançado é uma obra-prima que reflete a evolução artística e criativa do grupo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Lore Intrigante:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                ],
                            },
                            {
                                type: "blockquote",
                                content: [
                                    {
                                        type: "paragraph",
                                        attrs: { textAlign: "left" },
                                        content: [
                                            {
                                                text: "Uma das características mais notáveis da discografia do TXT é a construção cuidadosa da lore em seus álbuns. Através de elementos visuais, musicais e narrativos, eles criam universos coesos que interligam todas as faixas e álbuns. Essa narrativa transmídia não apenas envolve os fãs, mas também permite uma experiência imersiva única.",
                                                type: "text",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Representação da Geração Z:",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: " Os ", type: "text" },
                                    {
                                        text: "álbuns",
                                        type: "text",
                                        marks: [{ type: "code" }],
                                    },
                                    {
                                        text: ' do TXT são um reflexo sincero dos sentimentos, lutas e sonhos da geração Z. Suas letras abordam questões como autoaceitação, pressões sociais e busca de identidade. Através de músicas como "',
                                        type: "text",
                                    },
                                    {
                                        text: "Blue Hour",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: '" e "', type: "text" },
                                    {
                                        text: "21st Century Girl",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    {
                                        text: '", eles capturam os altos e baixos emocionais pelos quais muitos jovens passam.',
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Liderança na 4ª Geração:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                    {
                                        text: " Não se pode falar da 4ª geração do K-pop sem mencionar o TXT. Com sua musicalidade inovadora, coreografias marcantes e performances carismáticas, eles se estabeleceram como líderes incontestáveis dessa nova onda do gênero. Seu impacto vai além das fronteiras coreanas, conquistando fãs ao redor do mundo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Em conclusão, a discografia do TXT transcende simplesmente a música, mergulhando em narrativas profundas e representações genuínas da geração Z. Seu papel como líderes na 4ª geração do K-pop é evidente, cativando fãs e deixando uma marca indelével na indústria musical.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 1, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 1", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 2, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 2", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 3, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 3", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 4, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 4", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 5, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 5", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 6, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 6", type: "text" },
                                ],
                            },
                        ],
                    },
                    published: true,
                    serifed: false,
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
                    title: "10 animes que você precisa assistir",
                    subtitle: "Primeiro, gostaria de começar dizendo que é apenas a minha opinião de acordo com os meus gostos, ninguém é obrigado a assistir nada",
                    slug: "10-animes-que-voce-precisa-assistir",
                    json: {
                        type: "doc",
                        content: [
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Desde sua estreia, o Tomorrow X Together, mais conhecido como ",
                                        type: "text",
                                    },
                                    {
                                        text: "TXT",
                                        type: "text",
                                        marks: [
                                            {
                                                type: "link",
                                                attrs: {
                                                    href: "https://ibighit.com/txt/eng/",
                                                    class: null,
                                                    target: "_blank",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        text: ", tem cativado corações com sua música única e inovadora. Cada álbum lançado é uma obra-prima que reflete a evolução artística e criativa do grupo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Lore Intrigante:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                ],
                            },
                            {
                                type: "blockquote",
                                content: [
                                    {
                                        type: "paragraph",
                                        attrs: { textAlign: "left" },
                                        content: [
                                            {
                                                text: "Uma das características mais notáveis da discografia do TXT é a construção cuidadosa da lore em seus álbuns. Através de elementos visuais, musicais e narrativos, eles criam universos coesos que interligam todas as faixas e álbuns. Essa narrativa transmídia não apenas envolve os fãs, mas também permite uma experiência imersiva única.",
                                                type: "text",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Representação da Geração Z:",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: " Os ", type: "text" },
                                    {
                                        text: "álbuns",
                                        type: "text",
                                        marks: [{ type: "code" }],
                                    },
                                    {
                                        text: ' do TXT são um reflexo sincero dos sentimentos, lutas e sonhos da geração Z. Suas letras abordam questões como autoaceitação, pressões sociais e busca de identidade. Através de músicas como "',
                                        type: "text",
                                    },
                                    {
                                        text: "Blue Hour",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: '" e "', type: "text" },
                                    {
                                        text: "21st Century Girl",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    {
                                        text: '", eles capturam os altos e baixos emocionais pelos quais muitos jovens passam.',
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Liderança na 4ª Geração:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                    {
                                        text: " Não se pode falar da 4ª geração do K-pop sem mencionar o TXT. Com sua musicalidade inovadora, coreografias marcantes e performances carismáticas, eles se estabeleceram como líderes incontestáveis dessa nova onda do gênero. Seu impacto vai além das fronteiras coreanas, conquistando fãs ao redor do mundo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Em conclusão, a discografia do TXT transcende simplesmente a música, mergulhando em narrativas profundas e representações genuínas da geração Z. Seu papel como líderes na 4ª geração do K-pop é evidente, cativando fãs e deixando uma marca indelével na indústria musical.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 1, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 1", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 2, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 2", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 3, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 3", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 4, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 4", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 5, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 5", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 6, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 6", type: "text" },
                                ],
                            },
                        ],
                    },
                    published: true,
                    serifed: false,
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
                    title: "Melhores produtos para skincare",
                    subtitle: "Sempre me pedem dicas de produtos para skincare já que minha pele é perfeita, então",
                    slug: "melhores-produtos-para-skincare",
                    json: {
                        type: "doc",
                        content: [
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Desde sua estreia, o Tomorrow X Together, mais conhecido como ",
                                        type: "text",
                                    },
                                    {
                                        text: "TXT",
                                        type: "text",
                                        marks: [
                                            {
                                                type: "link",
                                                attrs: {
                                                    href: "https://ibighit.com/txt/eng/",
                                                    class: null,
                                                    target: "_blank",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        text: ", tem cativado corações com sua música única e inovadora. Cada álbum lançado é uma obra-prima que reflete a evolução artística e criativa do grupo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Lore Intrigante:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                ],
                            },
                            {
                                type: "blockquote",
                                content: [
                                    {
                                        type: "paragraph",
                                        attrs: { textAlign: "left" },
                                        content: [
                                            {
                                                text: "Uma das características mais notáveis da discografia do TXT é a construção cuidadosa da lore em seus álbuns. Através de elementos visuais, musicais e narrativos, eles criam universos coesos que interligam todas as faixas e álbuns. Essa narrativa transmídia não apenas envolve os fãs, mas também permite uma experiência imersiva única.",
                                                type: "text",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Representação da Geração Z:",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: " Os ", type: "text" },
                                    {
                                        text: "álbuns",
                                        type: "text",
                                        marks: [{ type: "code" }],
                                    },
                                    {
                                        text: ' do TXT são um reflexo sincero dos sentimentos, lutas e sonhos da geração Z. Suas letras abordam questões como autoaceitação, pressões sociais e busca de identidade. Através de músicas como "',
                                        type: "text",
                                    },
                                    {
                                        text: "Blue Hour",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    { text: '" e "', type: "text" },
                                    {
                                        text: "21st Century Girl",
                                        type: "text",
                                        marks: [{ type: "italic" }],
                                    },
                                    {
                                        text: '", eles capturam os altos e baixos emocionais pelos quais muitos jovens passam.',
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Liderança na 4ª Geração:",
                                        type: "text",
                                        marks: [{ type: "bold" }],
                                    },
                                    {
                                        text: " Não se pode falar da 4ª geração do K-pop sem mencionar o TXT. Com sua musicalidade inovadora, coreografias marcantes e performances carismáticas, eles se estabeleceram como líderes incontestáveis dessa nova onda do gênero. Seu impacto vai além das fronteiras coreanas, conquistando fãs ao redor do mundo.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                attrs: { textAlign: "left" },
                                content: [
                                    {
                                        text: "Em conclusão, a discografia do TXT transcende simplesmente a música, mergulhando em narrativas profundas e representações genuínas da geração Z. Seu papel como líderes na 4ª geração do K-pop é evidente, cativando fãs e deixando uma marca indelével na indústria musical.",
                                        type: "text",
                                    },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 1, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 1", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 2, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 2", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 3, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 3", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 4, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 4", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 5, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 5", type: "text" },
                                ],
                            },
                            {
                                type: "heading",
                                attrs: { level: 6, textAlign: "left" },
                                content: [
                                    { text: "Teste de Título 6", type: "text" },
                                ],
                            },
                        ],
                    },
                    published: true,
                    serifed: false,
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
                posts: {
                    create: u.posts?.create,
                },
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
