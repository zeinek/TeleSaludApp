import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendarcitaPage } from './agendarcita.page';

describe('AgendarcitaPage', () => {
  let component: AgendarcitaPage;
  let fixture: ComponentFixture<AgendarcitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarcitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
