import { MenuGrupoComponent } from './menu-grupo.component';
import { autoSpy } from 'autoSpy';

describe('MenuGrupoComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    // expect(c).toEqual
  });

  it('when ngAfterViewInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngAfterViewInit();
    // assert
    // expect(c).toEqual
  });

  it('when comprobarEstadoGrupoMenuLinkActivo is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.comprobarEstadoGrupoMenuLinkActivo();
    // assert
    // expect(c).toEqual
  });
});

function setup() {
  const builder = {
    default() {
      return builder;
    },
    build() {
      return new MenuGrupoComponent();
    }
  };

  return builder;
}
