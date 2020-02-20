import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * Animación para aplicar en la apertura y cierre de grupos de menú cuando
 *  el usuario hace clic en un menú desplegable del sidebar.
 */
export const abrirCerrarGrupoMenu = trigger('abrirCerrarGrupoMenu', [
    state('cerrado, ninguno', style({
        height: 0,
        minHeight: 0,
        opacity: 0,
    })),
    state('abierto', style({
        height: '*',
        opacity: 1
    })),
    transition('abierto <=> ninguno, abierto <=> cerrado', animate('300ms ease-in-out'))
]);
