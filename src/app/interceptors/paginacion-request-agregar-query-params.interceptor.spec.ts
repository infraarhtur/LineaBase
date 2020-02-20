import { TestBed } from '@angular/core/testing';

import { PaginacionRequestAgregarQueryParamsInterceptor } from './paginacion-request-agregar-query-params.interceptor';

describe('PaginacionRequestAgregarQueryParamsInterceptor', () => {
  const a = setup().default();
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginacionRequestAgregarQueryParamsInterceptor = TestBed.get(
      PaginacionRequestAgregarQueryParamsInterceptor
    );
    expect(service).toBeTruthy();
  });
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
  const builder = {
    default() {
      return builder;
    },
    build() {
      return new PaginacionRequestAgregarQueryParamsInterceptor();
    }
  };
  return builder;
}
