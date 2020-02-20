import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MostrarOcultarSpinnerInterceptor } from './mostrar-ocultar-spinner.interceptor';
import { autoSpy } from 'autoSpy';

describe('MostrarOcultarSpinnerInterceptor', () => {
  it('when intercept is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.intercept();
    // assert
    // expect(c).toEqual
  });
});

function setup() {
  // tslint:disable-next-line: variable-name
  const __spinnerService = autoSpy(Ng4LoadingSpinnerService);
  const builder = {
    __spinnerService,
    default() {
      return builder;
    },
    build() {
      return new MostrarOcultarSpinnerInterceptor(__spinnerService);
    }
  };

  return builder;
}
