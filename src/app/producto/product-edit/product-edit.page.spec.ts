import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductEditPage } from './product-edit.page';
import { ProductServiceService } from '../producto-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductEditPage', () => {
  let component: ProductEditPage;
  let fixture: ComponentFixture<ProductEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEditPage],
      imports: [HttpClientTestingModule, RouterTestingModule], // Asegúrate de incluir HttpClientTestingModule aquí
      providers: [ProductServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

