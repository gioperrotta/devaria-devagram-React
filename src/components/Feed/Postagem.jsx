/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Avatar } from "../Avatar";

import imgCurtir from '../../../public/images/curtir.svg';
import imgCurtido from '../../../public/images/curtido.svg';
import imgComentarioAtivo from '../../../public/images/comentarioAtivo.svg';
import imgComentarioCinza from '../../../public/images/comentarioCinza.svg';
import { FazerComentario } from "./FazerComentario";

const tamanhoLimiteDescricao = 90;

export default function Postagem({
  usuario,
  fotoDoPost,
  descricao,
  comentarios,
  usuarioLogado
}) {
  const[deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false);
  const [tamanhoAtualDescricao, setTamanhoAtualDescricao] = useState(tamanhoLimiteDescricao);

  const exibirDescricaoCompleta = () => {
    setTamanhoAtualDescricao(Number.MAX_SAFE_INTEGER)
  }

  const descricaoMaiorQueLimite = () => {
    return (descricao.length > tamanhoAtualDescricao)
  }

  const obterDescricao = () => {
    let mensagem = descricao.substring(0, tamanhoAtualDescricao);
    if (descricao.length > tamanhoAtualDescricao) {
      mensagem += '...'
    }
    return mensagem
  }

  return (
    <div className="postagem">
      <Link href={`/perfil/$usuario.id`} >
        <section className="headerPostagem">
          <Avatar src={usuario.avatar} />
          <strong>{usuario.nome}</strong>
        </section>
      </Link>
      <div className="fotoPostagem">
        <img src={fotoDoPost} alt='foto da postagem' />
      </div>
      <div className="footerPostagem">
        <div className="acoesPostagem">
          <Image
            src={imgCurtir}
            alt='icone Curtir'
            width={20}
            height={20}
            onClick={() => console.log('curtir')}
          />

          <Image
            src={imgComentarioCinza}
            alt='icone Comentar'
            width={20}
            height={20}
            onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
          />
          <span className="quantidadeCurtidas">
            Curtido por <strong>32 pessoas</strong>
          </span>
        </div>
        <div className="descricaoPostagem">
          <p className="descricao">
            <strong className="nomeUsuario">{usuario.nome}</strong>
            {obterDescricao()}
            {descricaoMaiorQueLimite() && (
              <spam
                className="exibirDescricaoCompleta"
                onClick={exibirDescricaoCompleta}
              >
                mais
              </spam>
            )}
          </p>
        </div>
        <div className="comentariosPostagem">
          {comentarios.map((comentario, i) => (
            <div key={i} className="comentario">
              <p className="descricao">
                <strong className="nomeUsuario">{comentario.nome}</strong>
                {comentario.mensagem}
              </p>
            </div>
          ))}
        </div>
      </div>
      {deveExibirSecaoParaComentar &&
        <FazerComentario
          usuarioLogado={usuarioLogado}
        />
      }
    </div>
  )
}