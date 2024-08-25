import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductServiceService } from '../producto-service.service';
import { ProductListPage } from '../product-list/product-list.page';

describe('ProductListPage', () => {
  let component: ProductListPage;
  let fixture: ComponentFixture<ProductListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListPage],
      imports: [HttpClientTestingModule],
      providers: [ProductServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

