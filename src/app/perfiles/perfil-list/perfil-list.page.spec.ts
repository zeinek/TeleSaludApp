import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilListPage } from './perfil-list.page';

describe('PerfilListPage', () => {
  let component: PerfilListPage;
  let fixture: ComponentFixture<PerfilListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilListPage],
      imports: [HttpClientTestingModule] // Importa HttpClientTestingModule aquí
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
