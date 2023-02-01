# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

### Mis notas

- Como funcionan las rutas en Redux?

  - Se debe crear el directorio 'app/routes'
  - Los componentes que se pongan en este directorio se podran obtener en el navegador (con la peticion HTTP) segun su nombre de archivo.
    Ej: Si el nombre de mi archivo es 'blog.jsx', en la ruta GET obtenemos la página con http:/<ip>/blog
  - Y si tenemos mas directorios dentro de 'app/routes', el nombre de estos directorios tambien harán parte de la ruta.
    Ej: Tengo el archivo 'app/routes/guitarras/curso.jsx', la ruta GET sería 'http:/<ip>/guitarras/curso'

  * Como funcionan las Nested Routes

  - En el navegador la ruta padre es 'http:/<ip>/guitarras/' y ya lo que se le ponga enseguida seria la ruta hija. Al entrar solamente a esta ruta 'padre'
    obtenemos una vista con la lista de todas las guitarras y al darle click a cada guitarra nos mandaria ya a la ruta hija que sería llamada algo asi
    'http:/<ip>/guitarras/guitarraNombre'. Para traducir esto a la estructura de Redux se haría asi:

    1. Se crea el directorio padre: 'app/routes/guitarras/'
    2. Se crea una especie de plantilla que OJO va a contener el componente Outlet: 'app/routes/guitarras.jsx'
    3. Dentro del directorio padre (pt1) van a estar los archivos:
       3.1. index.jsx: este va a ser la vista que se va a renderizar al llamar a la ruta padre sola 'http:/<ip>/guitarras/'
       3.2. $guitarraUrl: este va a ser la vista que se va a rendereizar al llamar a la ruta ya con su hija 'http:/<ip>/guitarras/guitarraNombre'

    Y es así de facil, Redux por defecto hace todo el trabajo (y ojó importante el componenete Outlet en el pt2)

- En Remix la carpeta con funciones utiles (se debe llamar es "utils" xD)
