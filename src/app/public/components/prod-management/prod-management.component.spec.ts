import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdManagementComponent } from './prod-management.component';

describe('ProdManagementComponent', () => {
  let component: ProdManagementComponent;
  let fixture: ComponentFixture<ProdManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdManagementComponent]
    });
    fixture = TestBed.createComponent(ProdManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
