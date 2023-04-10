import { useRouter } from "next/router";
import { UsuarioService } from "@/services/UsuarioService"

export default function comAutorizacao(Componente) {
  const usuarioService = new UsuarioService();
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter();
    if (typeof window !== 'undefined' ) {
      if (!usuarioService.estaAutenticado()) {
        router.replace('/');
        return null;
      }
      return <Componente {...props} />
    }
    return null;
  }
}