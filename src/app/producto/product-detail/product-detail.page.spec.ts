import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductDetailPage } from './product-detail.page';
import { ProductServiceService } from '../producto-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductDetailPage', () => {
  let component: ProductDetailPage;
  let fixture: ComponentFixture<ProductDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailPage],
      imports: [HttpClientTestingModule, RouterTestingModule], // Asegúrate de incluir HttpClientTestingModule aquí
      providers: [ProductServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

