export type actionFunction = (prevState: any, formData: FormData) =>
  Promise<{ message: string }>


export type listaDeCategoriasType = {
  name: string,
  imageName?: string

}
