import { DevagramApiService } from "./DevagramApiService";

export class FeedService extends DevagramApiService {
   async carregarPostagens(idUsuario) {
    let url = '/feed'
    if (idUsuario) {
      url = url + `?id=${idUsuario}`
    }
    return await this.get(url)
  }

  async adicionarComentario (idPost, comentario) {
    return await this.put(`/comentario?id=${idPost}`, {
      comentario
    })
  }

  async alterarCurtida(idPost) {
    return await this.put(`/like?id=${idPost}`)
  }

  async fazerPublicacao(dadosPublicacao) {
    return this.post('/publicacao', dadosPublicacao)
  }

}