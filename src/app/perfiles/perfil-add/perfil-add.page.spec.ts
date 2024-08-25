import { TestBed } from '@angular/core/testing';
import { ProductServiceService } from 'src/app/producto/producto-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductListPage', () => {
  let productService: ProductServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Asegúrate de importar HttpClientModule aquí
      providers: [ProductServiceService],
    });

    productService = TestBed.inject(ProductServiceService);
  });

  it('should create', () => {
    expect(productService).toBeTruthy();
  });
});
