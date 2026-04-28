import { mock } from 'vitest-mock-extended';
import { HttpErrorMapper } from './HttpErrorMapper';
import { IHttpErrorMapper } from './IHttpErrorMapper';
import { HttpErrorResponse } from '@angular/common/http';

describe('HttpErrorMapper tests', () => {
  let mapper: IHttpErrorMapper;

  beforeEach(() => (mapper = new HttpErrorMapper()));

  it('should start without mappings', () => {
    expect(mapper.StatusCodesMapped).toStrictEqual([]);
  });

  it('should add an status code and its mapping function', () => {
    const func = vi.fn();

    mapper.addMapping(404, func);

    expect(mapper.StatusCodesMapped).toContain(404);
    const error = new HttpErrorResponse({ status: 404 });
    mapper.map(error);
    expect(func).toHaveBeenCalledExactlyOnceWith(error);
  });

  it('should allow multiple code mappings and mapp with the functions', () => {
    const func1 = vi.fn();
    const func2 = vi.fn();

    mapper.addMapping(401, func1);
    mapper.addMapping(404, func2);

    expect(mapper.StatusCodesMapped).toContain(401);
    expect(mapper.StatusCodesMapped).toContain(404);

    const error401 = new HttpErrorResponse({ status: 401 });
    const error404 = new HttpErrorResponse({ status: 404 });

    mapper.map(error401);
    mapper.map(error404);

    expect(func1).toHaveBeenCalledExactlyOnceWith(error401);
    expect(func2).toHaveBeenCalledExactlyOnceWith(error404);
  });

  it('should override the status code', () => {
    const func1 = vi.fn();
    const func2 = vi.fn();

    mapper.addMapping(401, func1);
    mapper.addMapping(401, func2);

    const error = new HttpErrorResponse({ status: 401 });

    mapper.map(error);

    expect(func1).not.toHaveBeenCalled();
    expect(func2).toHaveBeenCalledExactlyOnceWith(error);
    expect(mapper.StatusCodesMapped).toStrictEqual([401]);
  });

  it('should mapp with only the respective function', () => {
    const func404 = vi.fn();
    const func401 = vi.fn();

    mapper.addMapping(404, func404);
    mapper.addMapping(401, func401);

    const error401 = new HttpErrorResponse({ status: 401 });
    const error404 = new HttpErrorResponse({ status: 404 });

    mapper.map(error401);

    expect(func401).toHaveBeenCalledExactlyOnceWith(error401);
    expect(func404).not.toHaveBeenCalled();

    vi.clearAllMocks();

    mapper.map(error404);

    expect(func401).not.toHaveBeenCalled();
    expect(func404).toHaveBeenCalledExactlyOnceWith(error404);
  });

  it('should raise error for a non-mapped status code', () => {
    const error = new HttpErrorResponse({ status: 500 });

    expect(() => mapper.map(error)).toThrow(TypeError);
  });

  it('should propagate errors from mapping functions', () => {
    const error = new Error('MyError');

    const func = vi.fn();

    func.mockImplementation(() => {
      throw error;
    });

    mapper.addMapping(403, func);

    const err = new HttpErrorResponse({ status: 403 });
    expect(() => mapper.map(err)).toThrow(error);
  });
});
