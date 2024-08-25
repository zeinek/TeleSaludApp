import { TestBed } from '@angular/core/testing';
import { PerfilServiceService } from 'src/app/perfiles/perfil-service.service';
import { HttpClientModule } from '@angular/common/http'; // Importa el HttpClientModule

describe('PerfilServiceService', () => {
  let service: PerfilServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Asegúrate de importar el HttpClientModule aquí
      providers: [PerfilServiceService]
    });
    service = TestBed.inject(PerfilServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
