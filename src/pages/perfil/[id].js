import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Feed from "@/components/Feed"
import comAutorizacao from "@/hoc/comAutorizacao"
import HeaderPerfil from "@/components/HeaderPerfil";
import { UsuarioService } from "@/services/UsuarioService";

const usuarioService = new UsuarioService();

function Perfil({ usuarioLogado }) {
  const [usuario, setUsuario] = useState({});
  const router = useRouter();

  const estaNoPerfilPessoal = () => {
    return router?.query?.id === 'eu'
  }

  const obterPerfil = async (idUsuario) => {
    try {
      const { data } = await usuarioService.obterPerfil(
        estaNoPerfilPessoal() ?
          usuarioLogado.id
          : idUsuario)
      setUsuario(data);
    } catch (error) {
      alert('Erro ao obter Perfil do usuário',)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      obterPerfil(router.query.id)
    }
  }, [router?.query?.id])

  return (
    <div className="paginaPerfil">
      <HeaderPerfil
        usuarioLogado={usuarioLogado}
        usuario={usuario}
        estaNoPerfilPessoal={estaNoPerfilPessoal()}
      />
      <Feed
        usuarioLogado={usuarioLogado}
        idUsuario={usuario?._id}
      />
    </div>
  )
}

export default comAutorizacao(Perfil)