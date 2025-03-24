import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFormComponent, HttpClientModule],
      providers: [...provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
