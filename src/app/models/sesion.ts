import { Usuario } from './usuario';
import { Menu } from './menu';
import { Role } from './role';


export class Sesion {
    public accessToken: string;
    public refreshToken: string;
    public tokenType = 'Bearer';
    public user: Usuario;
    public listMenu: Menu[] = [];
    public listRole: Role[] = [];
}
