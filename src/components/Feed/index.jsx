import { useEffect, useState } from "react"
import Postagem from "./Postagem";
import { FeedService } from "@/services/FeedService";

const feedService = new FeedService();

export default function Feed({ usuarioLogado, idUsuario }) {
  const [listaDePostagens, setListaDePostagens] = useState([]);

  const obterDadosApi = async () => {
    const { data } = await feedService.carregarPostagens(idUsuario);
    const postagensFormatadas = data.map((post) => (
      {
        id: post._id,
        usuario: {
          id: post.user.userId,
          nome: post.user.nome,
          avatar: post.user.avatar
        },
        fotoDoPost: post.foto,
        descricao: post.descricao,
        curtidas: post.likes,
        comentarios: post.comentarios.map((c) => (
          {
            nome: c.nome,
            mensagem: c.comentario
          }
        ))
      }
    ))
    setListaDePostagens(postagensFormatadas);
  }

  useEffect(() => {
    setListaDePostagens([]);
    obterDadosApi();
  }, [usuarioLogado, idUsuario])

  if (!listaDePostagens.length) {
    return null;
  }

  return (
    <div className="feedContainer largura30pctDesktop">
      {listaDePostagens.map(dadosPostagem => (
          <Postagem
            key={dadosPostagem.id}
            {...dadosPostagem}
            usuarioLogado={usuarioLogado}
          />
        ))}
    </div>
  )
}