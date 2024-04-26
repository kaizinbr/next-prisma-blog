/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { prisma } from "@/lib/prisma";

export default async function Posts() {
    const posts = await prisma.post.findMany();

    return (
        <div>
            <h1>Posts</h1>
            <div className="grid grid-cols-3 gap-6 px-8">
                <p className="sm:mb-4 mb-6">
                    Desde sua estreia, o Tomorrow X Together, mais conhecido
                    como{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        href="https://ibighit.com/txt/eng/"
                    >
                        TXT
                    </a>
                    , tem cativado corações com sua música única e inovadora.
                    Cada álbum lançado é uma obra-prima que reflete a evolução
                    artística e criativa do grupo.
                </p>
                <p className="sm:mb-4 mb-6">
                    <strong>Lore Intrigante:</strong>
                </p>
                <blockquote>
                    <p className="sm:mb-4 mb-6">
                        Uma das características mais notáveis da discografia do
                        TXT é a construção cuidadosa da lore em seus álbuns.
                        Através de elementos visuais, musicais e narrativos,
                        eles criam universos coesos que interligam todas as
                        faixas e álbuns. Essa narrativa transmídia não apenas
                        envolve os fãs, mas também permite uma experiência
                        imersiva única.
                    </p>
                </blockquote>
                <p className="sm:mb-4 mb-6">
                    <em>Representação da Geração Z:</em> Os <code>álbuns</code>{" "}
                    do TXT são um reflexo sincero dos sentimentos, lutas e
                    sonhos da geração Z. Suas letras abordam questões como
                    autoaceitação, pressões sociais e busca de identidade.
                    Através de músicas como "<em>Blue Hour</em>" e "
                    <em>21st Century Girl</em>", eles capturam os altos e baixos
                    emocionais pelos quais muitos jovens passam.
                </p>
                <p className="sm:mb-4 mb-6">
                    <strong>Liderança na 4ª Geração:</strong> Não se pode falar
                    da 4ª geração do K-pop sem mencionar o TXT. Com sua
                    musicalidade inovadora, coreografias marcantes e
                    performances carismáticas, eles se estabeleceram como
                    líderes incontestáveis dessa nova onda do gênero. Seu
                    impacto vai além das fronteiras coreanas, conquistando fãs
                    ao redor do mundo.
                </p>
                <p className="sm:mb-4 mb-6">
                    Em conclusão, a discografia do TXT transcende simplesmente a
                    música, mergulhando em narrativas profundas e representações
                    genuínas da geração Z. Seu papel como líderes na 4ª geração
                    do K-pop é evidente, cativando fãs e deixando uma marca
                    indelével na indústria musical.
                </p>
                <h1 className="mb-6">Teste de Título 1</h1>
                <h2 className="mb-6">Teste de Título 2</h2>
                <h3 className="mb-6">Teste de Título 3</h3>
                <h4 className="mb-6">Teste de Título 4</h4>
                <h5 className="mb-6">Teste de Título 5</h5>
                <h6 className="mb-6">Teste de Título 6</h6>
            </div>
        </div>
    );
}
