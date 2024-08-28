import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilDetailPage } from './perfil-detail.page';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

describe('PerfilDetailPage', () => {
  let component: PerfilDetailPage;
  let fixture: ComponentFixture<PerfilDetailPage>;

  beforeEach(async () => {
    const activatedRouteStub = {
      params: new BehaviorSubject({ userId: 'testUserId' }), // Simula un objeto con el parámetro 'userId'
    };

    await TestBed.configureTestingModule({
      declarations: [PerfilDetailPage],
      imports: [HttpClientTestingModule], // Agrega HttpClientTestingModule a los imports
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
        // Puedes agregar otros proveedores necesarios aquí si es necesario
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
