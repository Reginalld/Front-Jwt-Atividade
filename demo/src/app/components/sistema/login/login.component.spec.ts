import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/loginservice.service';
import { of, throwError } from 'rxjs';
import { Login } from 'src/app/models/login';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  beforeEach(waitForAsync(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLoginService = jasmine.createSpyObj('LoginService', ['logar', 'removerToken', 'addToken']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logar method on form submission', () => {
    spyOn(component, 'logar');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.logar).toHaveBeenCalled();
  });

  it('should show alert and log error on login error', () => {
    const login: Login = { username: 'testuser', password: 'testpassword' };
    component.login = login;
    const errorMessage = 'Test error';
    mockLoginService.logar.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.logar();

    expect(window.alert).toHaveBeenCalledWith('Exemplo de tratamento de erro/exception! Observe o erro no console!');
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });
});