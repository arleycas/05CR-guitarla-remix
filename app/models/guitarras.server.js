export async function getGuitarras() {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
  const resultado = await respuesta.json();

  return resultado;
}

export async function getGuitarra(nombreGuitarra) {

  const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${nombreGuitarra}&populate=imagen`);
  const resultado = await respuesta.json()

  return resultado;

}