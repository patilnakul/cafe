import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpRequest } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { TokenInterceptor} from './token-interceptor.interceptor';

describe('TokenInterceptorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    localStorage.setItem('token', 'mock-token');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
  });
});
// import { TestBed } from '@angular/core/testing';

// import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';

// describe('TokenInterceptorInterceptor', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     providers: [
//       TokenInterceptorInterceptor
//     ]
//   }));

//   it('should be created', () => {
//     const interceptor: TokenInterceptorInterceptor = TestBed.inject(TokenInterceptorInterceptor);
//     expect(interceptor).toBeTruthy();
//   });
// });
