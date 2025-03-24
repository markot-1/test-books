import { TestBed } from '@angular/core/testing';
import { BooksService } from './books.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
      providers: [...provideHttpClientTesting()]
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
