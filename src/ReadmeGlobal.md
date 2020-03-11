# Seguros Alfa!

Esta es una documentación global  del proyecto Seguros Alfa donde se explica la distribución de cada uno de  las carpetas que componen el proyecto.

# Src

Es una carpeta contenedora global es ella se encuentran varias subcarpetas  las cuales contienen el paquete completo de cada distribucion del proyecto.

## App

La carpeta  [ App ]  es nuestro modulo  global  esta contiene subcarpetas que son las que  distribuyen el proyecto ; los archivos principales de este folder son :

|       Archivo                          | Descripcion|
|----------------|-------------------------------|-----------------------------|
|AppComponent.html|Este es el componente principal el cual permite renderizar los componentes globales |
|AppComponent.css         | Estilo propios del app component
|AppRouting.ts            |  Controlador de enrutamientos globales.|
|AppModule.ts | Modulo principal donde se inyectan las dependencias globales , proovedores  y componetes globales o estaticos.
|Appcomponent.ts        |Este es el componente que permite inyectar la logica  en este caso corresponde a logica basada  en:
	> Logica de apertura de modales.
	> Obtención de token desde el local Storage.
	> Configuración de inactividad.
	



## Animations

Animaciones y transiciones que se inyectan en el sidebar.
Carpetas :
> - Animations.ts.
> - menu.ts

## Components

Esta carpeta  es la que contiene los componentes :
> - Navbar : Componente que renderiza la barra de navegación superior.
> - Sidebar : Componente que permite renderizar  la barra de menu posicionada en la parte izquierda de la pantalla  y dentro de este obtener los menus asociados y mapearlos.
> - Home : Componente que permite renderizar el contenido de cualquier pantalla esta es activada atraves del **<Router-outlet**

## Directives

Esta carpeta contiene  logica de validadores  y expresiones regulares las cuales son usadas en formularios; esta contiene  una subcarpeta llamada **Validators** la cual contiene archivos ts  cada uno de estos son inyectados en su  respectiva directiva .
## Functions

Esta carpeta contiene las siguientes funciones  :
> - CargarJSON : Este permite  o realiza  un llamado a un json que a su vez inyecta  una configuración en el redireccionamiento para  la conexion con la base de datos.
> - ObtenerJwtToken : Este permite Recuperar información del token atravez del inicio de sesión.

## Guards

Los guards permiten activar la seguridad  para las vistas  y la carga de los 
 menus dependiendo de la asignación de roles.
 los guards se activan  atravez de la inyección en los enrutamientos de cada modulo de esta manera:
- >const  HomologacionRoutes: Routes = [{
path:  'Homologacion',
component:  MainComponent,
canActivate:  [ LoginGuard , AuthGuard ],
canActivateChild: [ LoginGuard, AuthGuard],

## Interceptor

los Interceptor inspecciona y modifica las peticiones, que va de la  aplicación al servidor y también lo que viene del servidor a tu aplicación ; se obtiene respuesta de errores controlados y no controlados.

## Interfaces
Las interfaces se usan para obtener desde  un servicio  propiedades que permiten cargar datos asociados  estas solo se declaran atributos y métodos sin su implementación.

## Models

El modelo se usa para declarar tipos de datos; asociándolos a la respuesta que se obtenga desde el backend de esta manera  se  unifican respuestas del lado del front y del back.

## Modules
Esta carpeta contiene  cada modulo  el cual sera renderizado 
cada modulo esta compuesto por tres archivos : 
>- **"nombremodulo" .routing.ts** : Este al igual que el componente app tiene  un sistema de enrutamientos.
>- **"nombremodulo". module.ts** : Este permite inyectar librerias dependencias dentro de ese modulo.
>-**Components**: Esta carpeta contiene  cada componente asociado a ese modulo y cada componente propiamente tiene  su  html , css y ts. 
> 

## Services

Los servicios son la conexion de la respuesta del backend ; de esta manera se puede inyectar a cada componente  servicos rest ; **GET , POST , PUT , DELETE**. 

## Utils

Los utils se asignan para crear utilitarios globales que  pueden ser inyectados en un servicio o  metodo  de esta manera   se reutiliza codigo sin necesidad de repetirlo.

## Assets

La carpetas assets contiene: 
- archivos JSON  los cuales se pueden usan para realizar pruebas locales sin necesidad de usar el backend .
- Carpeta **( Img )**: esta contiene todas las imágenes que desee  inyectar en  el aplicativo.

## Environment

Este es nuestro archivo que entorno  global el cual permite conectar  e inyectar ciertas configuraciones con el backend;por medio de este se puede 
suministrar el re direccionamiento de servicios rest configuraciones de url para realizar un despliegue  de producción.
