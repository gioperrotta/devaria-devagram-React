import { useRouter } from "next/router";

import { Header } from "../components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { UsuarioService } from "@/services/UsuarioService";

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
          <Header usuarioLogado={usuarioLogado}/>
          <Componente usuarioLogado={usuarioLogado} {...props} />
          <Footer usuarioLogado={usuarioLogado} />
        </>
      )
    }
    return null;
  }
}