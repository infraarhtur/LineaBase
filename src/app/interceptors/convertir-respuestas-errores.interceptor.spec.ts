import { UtilidadesService } from '../services/utilidades.service';
import { ConvertirRespuestasErroresInterceptor } from './convertir-respuestas-errores.interceptor';
import { autoSpy } from 'autoSpy';

describe('ConvertirRespuestasErroresInterceptor', () => {
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
  const __utilidadesService = autoSpy(UtilidadesService);
  const builder = {
    __utilidadesService,
    default() {
      return builder;
    },
    build() {
      return new ConvertirRespuestasErroresInterceptor(__utilidadesService);
    }
  };

  return builder;
}
