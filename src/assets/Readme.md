
# Documentacion JSON
En la siguiente documentación se presenta  los  Json que  se asocian para realizar pruebas sin necesidad de usar el recurso del backend y  Json que permiten realizar una asignación o  reemplazo a la hora de realizar un despliegue.
- datosDePrueba.json
- SesionFake.json
-  Sesion.json
> Estos Json se usan para iniciar  una sesion desde una data quemada, este retorna  :
 
- accessToken :  Este es el token que permite validar el inicio de sesion 
- RefreshToken : Este permite obtener un  codigo encriptado que a su vez  realiza   el "Refresh " para que  una sesión no expire.
  
- user : Este objeto  contiene la información del usuario que realizo la autenticación.
- ListMenu: Este es un array de objetos el cual contiene los menus asociados a ese usuario 
- ListRole : Este es  un array de objetos el cual contiene  el role que se asocia a ese usuario  existe un array que se llama ***vistaRole** este  debe contener un alias por cada pantalla asociada a ese menu  