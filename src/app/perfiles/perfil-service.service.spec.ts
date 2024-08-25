import { TestBed } from '@angular/core/testing';
import { PerfilServiceService } from 'src/app/perfiles/perfil-service.service'; // Asegúrate de importar correctamente tu servicio
import { HttpClientModule } from '@angular/common/http';

describe('PerfilServiceService', () => {
  let perfilService: PerfilServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Asegúrate de importar HttpClientModule aquí
      providers: [PerfilServiceService],
    });
    perfilService = TestBed.inject(PerfilServiceService);
  });

  it('should be created', () => {
    expect(perfilService).toBeTruthy();
  });
});
