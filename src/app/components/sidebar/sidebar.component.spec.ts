import { UtilidadesService } from '../../services/utilidades.service';
import { SidebarComponent } from './sidebar.component';
import { autoSpy } from 'autoSpy';

describe('SidebarComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    // expect(c).toEqual
  });

  it('when ngAfterContentChecked is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngAfterContentChecked();
    // assert
    // expect(c).toEqual
  });
});

function setup() {
  const utilidadesService = autoSpy(UtilidadesService);
  const builder = {
    utilidadesService,
    default() {
      return builder;
    },
    build() {
      return new SidebarComponent(utilidadesService);
    }
  };

  return builder;
}
