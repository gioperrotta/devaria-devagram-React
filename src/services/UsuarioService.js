import { HttpService } from "./HttpService";

export class UsuarioService extends HttpService {
  async login(credenciais) {
    const { data } = await this.post('/login', credenciais)
    console.log(data);
    localStorage.setItem("nome", data.nome);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);
    const usuario = await this.get('/user');
    localStorage.setItem('id', usuario.data._id);
    if (usuario.data.avatar) {
      localStorage.setItem("avatar", usuario.data.avatar);
    }
  }

  async cadastro(dados) {
    return this.post('/usercreate', dados)
  }

  estaAutenticado() {
    return localStorage.getItem('token') !== null
  }

  async pesquisar(termoDaPesquisa) {
    return this.get(`pesquisa?filtro=${termoDaPesquisa}`)
  }

  obterInformacoesUsuarioLogado() {
    return {
      id: localStorage.getItem('id'),
      nome: localStorage.getItem('nome'),
      email: localStorage.getItem('email'),
      avatar: localStorage.getItem('avatar'),
    }
  }

}