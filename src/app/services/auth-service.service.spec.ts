import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthService } from './auth-service.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [AuthService]
    }).compileComponents();

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
