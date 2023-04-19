export class LoaderHelper {
  static exibir() {
    document
      .querySelector('.loaderContainer')
      ?.classList.remove('oculto')
  }

  static ocultar() {
    setTimeout(() => {
      document
        .querySelector('.loaderContainer')
        ?.classList.add('oculto')
    },500)
  }
}