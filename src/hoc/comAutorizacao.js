import { useRouter } from "next/router";

import HeaderApp  from "../components/layout/HeaderApp";
import FooterApp from "@/components/layout/FooterApp";

import { UsuarioService } from "@/services/UsuarioService";
import Loader from "@/components/Loader";

export default function comAutorizacao(Componente) {
  const usuarioService = new UsuarioService();
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    if (typeof window !== 'undefined') {
      if (!usuarioService.estaAutenticado()) {
        router.replace('/');
        return null;
      }

      const usuarioLogado = usuarioService.obterInformacoesUsuarioLogado();
      
      return (
        <>
          <HeaderApp usuarioLogado={usuarioLogado}/>
          <Loader/>
          <Componente usuarioLogado={usuarioLogado} {...props} />
          <FooterApp usuarioLogado={usuarioLogado} />
        </>
      )
    }
    return null;
  }
}