import { Vista } from './vista';

export class Role {
  constructor(
    public id?: string,
    public descripcion?: string,
    public vistas?: Vista[],
    public vistaRole?: string []
  ) {}

}
