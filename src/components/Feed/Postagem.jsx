/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Avatar } from "../Avatar";

import imgCurtir from '../../../public/images/curtir.svg';
import imgCurtido from '../../../public/images/curtido.svg';
import imgComentarioAtivo from '../../../public/images/comentarioAtivo.svg';
import imgComentarioCinza from '../../../public/images/comentarioCinza.svg';
import FazerComentario  from "./FazerComentario";
import { FeedService } from "@/services/FeedService";

const tamanhoLimiteDescricao = 90;
const feedService = new FeedService();

export default function Postagem({
  id,
  usuario,
  fotoDoPost,
  descricao,
  comentarios,
  usuarioLogado,
  curtidas
}) {
  const [curtidasPost, setCurtidasPost] = useState(curtidas);
  const [comentariosPost, setComentariosPost] = useState(comentarios);
  const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false);
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

  const obterImagemComentario = () => {
    return deveExibirSecaoParaComentar
      ? imgComentarioAtivo
      : imgComentarioCinza
  }

  const comentar = async (comentario) => {
    try {
      await feedService.adicionarComentario(id, comentario);
      setDeveExibirSecaoParaComentar(false);
      setComentariosPost([
        ...comentariosPost,
        {
          nome: usuarioLogado.nome,
          mensagem: comentario
        }
      ])
    } catch (error) {
      alert('Erro ao fazer comentario! ' + error?.response?.data?.error)
    }
  }

  const estaCurtido = () => {
    if (curtidasPost.length > 0) {
      return curtidasPost.includes(usuarioLogado.id)
    } 
    return false    
  }

  const obterImgCurtir = () => {
    return estaCurtido() 
      ? imgCurtido
      : imgCurtir
  }

  const alterarCurtida = async () => {
    try {
      await feedService.alterarCurtida(id);
      if (estaCurtido()) {
        setCurtidasPost(
          curtidasPost.filter(idUsuario => idUsuario !== usuarioLogado.id)
        )
      } else {
        setCurtidasPost(...curtidasPost, Array(usuarioLogado.id) )
      }
    } catch (error) {
      alert('Erro ao alterar curtida! ' + error?.response?.data?.error)
    }
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
            src={obterImgCurtir()}
            alt='icone Curtir'
            width={20}
            height={20}
            onClick={alterarCurtida}
          />
          <Image
            src={obterImagemComentario()}
            alt='icone Comentar'
            width={20}
            height={20}
            onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
          />
          <span className="quantidadeCurtidas">
            Curtido por <strong>{curtidasPost.length} pessoas</strong>
          </span>
        </div>
        <div className="descricaoPostagem">
          <p className="descricao">
            <strong className="nomeUsuario">{usuario.nome}</strong>
            {obterDescricao()}
            {descricaoMaiorQueLimite() && (
              <span className="exibirDescricaoCompleta"
                onClick={exibirDescricaoCompleta}>
                mais
              </span>
            )}
          </p>
        </div>
        <div className="comentariosPostagem">
          {comentariosPost.map((comentario, i) => (
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
          comentar={comentar}
          usuarioLogado={usuarioLogado}
        />
      }
    </div>
  )
}