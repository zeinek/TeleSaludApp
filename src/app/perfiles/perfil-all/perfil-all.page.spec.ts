import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilAllPage } from './perfil-all.page';

describe('PerfilAllPage', () => {
  let component: PerfilAllPage;
  let fixture: ComponentFixture<PerfilAllPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(PerfilAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
