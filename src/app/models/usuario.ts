import { Role } from './role';
import { Vista } from './vista';

export class Usuario {
    public id: string;
    public idTipoDoc = 0;
    public numeroDocumento: string;
    public nombre: string;
    public apellido: string;
    public nombreUsuario: string;
    public correo: string;
    public fechaCreacion: string;
    public nombreUsuarioCreacion: string;
    public estado: number | boolean = true;
    public roles: (Role | string)[] = [];
    public listRole: Role [];
}
