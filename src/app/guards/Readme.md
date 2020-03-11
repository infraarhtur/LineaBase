# Guards
> Los guards son interfaces que permiten proteger  vistas dependiendo de los roles y menús asociados ;  en este caso se están usando dos guard  los cuales son : 
## AuthGuards
> - AuthGuards :  este inyecta el control a las vistas que estén asociadas a un rol si este no  encuentra las respectivas vistas saldrá un mensaje indicando  que no se puede acceder a la ruta especifica,  el código es el siguiente :
> 
    
    comprobarSiAutorizado(routeData: Data): any {
    
    this.vista = JSON.parse(localStorage.getItem('vistas'));
    console.log(this.vista);
    this.isAutorizado = false;

    this.vista.forEach(itemVistas => {
      if (itemVistas === routeData.alias) {
        this.isAutorizado = true;
        return;
      }
    });
    return this.isAutorizado; }


> RouterData permite obtener el alias asociado a la  pantalla , de esta manera se obtiene el alias de esa pantalla :
> - {
path:  'tablaPartes',
component:  ListadoComponent,
data: { vista:  vistas.TablaPartes }
},

Se debe agregar un nuevo campo  desde el routing de cada modulo  que se llame data este es un objeto el cual debe contener  una variable  **vista** seguido del nombre o alias de esa pantalla  


 
  Esta variable permite obtener del local storage las vistas guardadas previamente.
  
      this.vista = JSON.parse(localStorage.getItem('vistas'));. 
     -------------------------------------------------------------
    
  Inicializacion de la variable isAutorizado
  
    ** this.isAutorizado = false;**
Recorrido y validación de vistas asociadas  y alias establecido en cada pantalla 


|| ** this.vista.forEach(itemVistas => {
      if (itemVistas === routeData.alias) {
        this.isAutorizado = true;
        return;
      }
    });
    return this.isAutorizado; } **

## loginGuard
> - loginGuards  :  este inyecta una validación de seguridad en el cual verifica si el usuario no esta logueado  e intenta acceder pegando una url directamente  a la barra de navegación ; la respuesta que obtiene es de tipo booleano , si el usuario no esta logueado automaticamente retornara de nuevo a el login.
> 
   