import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import HeaderComAcoes from "../HeaderComAcoes";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { UsuarioService } from "@/services/UsuarioService";

import imgSetaEsquerda from '../../../public/images/voltar.svg';
import imgLogout from '../../../public/images/Logout.svg';

const usuarioService = new UsuarioService();

export default function HeaderPerfil({
  usuario,
  estaNoPerfilPessoal
}) {
  const [estaSeguindoUsuario, setEstaSeguindoUsuario] = useState(false);
  const [quantidadeSeguidores, setQantidadeSeguidores] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      return;
    }
    if (!usuario.segueEsteUsuario) {
      setEstaSeguindoUsuario(false)
    } else {
      setEstaSeguindoUsuario(usuario.segueEsteUsuario)
    }
    setQantidadeSeguidores(usuario.seguidores)
  }, [usuario])

  const obterTextoBotaoSeguir = () => {
    if (estaNoPerfilPessoal) {
      return 'Editar perfil'
    }
    if (estaSeguindoUsuario) {
      return 'Deixar de Seguir'
    }
    return 'Seguir'
  }

  const obterCorDoBotaoSeguir = () => {
    if (estaSeguindoUsuario || estaNoPerfilPessoal) {
      return 'invertido'
    }
    return 'primaria'
  }

  const manipulaClickBtnPrincipal = async () => {
    if (estaNoPerfilPessoal) {
      return router.push('/perfil/editar')
    }
    try {
      await usuarioService.alternarSeguir(usuario._id);
      setQantidadeSeguidores(setEstaSeguindoUsuario ?
        quantidadeSeguidores - 1 : quantidadeSeguidores + 1
      )
      setEstaSeguindoUsuario(!estaSeguindoUsuario);
    } catch (error) {
      alert('Erro ao Seguir ou Deixar de Seguir o usuário')
    }
  }

  const aoClicarSetaEsquerda = () => {
    router.back();
  }

  const obterElementoDireita = () => {
    if (estaNoPerfilPessoal) {
      return (
          <Image
            src={imgLogout}
            alt="icone logout"
            onClick={logout}
            width={23}
            height={23}
          />
      )
    }
    return null
  }

  const logout = () => {
    usuarioService.logout();
    router.replace('/')
  }

  return (
    <div className="cabecalhoPerfil largura30pctDesktop">
      <HeaderComAcoes
        iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
        aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
        titulo={usuario.nome}
        elementoDireita={obterElementoDireita()}
      />
      <hr className="linhaDivisoria" />
      <div className="statusPerfil">
        <Avatar src={usuario.avatar} />
        <div className="informacoesPerfil">
          <div className="statusContainer">
            <div className="status">
              <strong>{usuario.publicacoes}</strong>
              <span>Publicações</span>
            </div>
            <div className="status">
              <strong>{quantidadeSeguidores}</strong>
              <span>Seguidores</span>
            </div>
            <div className="status">
              <strong>{usuario.seguindo}</strong>
              <span>Seguindo</span>
            </div>

          </div>
          <Button
            texto={obterTextoBotaoSeguir()}
            cor={obterCorDoBotaoSeguir()}
            onClick={manipulaClickBtnPrincipal}
          />
        </div>
      </div>
    </div>

  )
}