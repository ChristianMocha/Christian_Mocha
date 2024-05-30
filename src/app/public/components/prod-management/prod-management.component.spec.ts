import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProdManagementComponent } from './prod-management.component';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('ProdManagementComponent', () => {
  let component: ProdManagementComponent;
  let fixture: ComponentFixture<ProdManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdManagementComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({ PM: 'value' }) } }
      ],
      imports: [ HttpClientModule ] // Aquí importa tus módulos necesarios
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});