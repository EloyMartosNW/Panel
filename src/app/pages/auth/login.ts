import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../core/services/auth.service';
import { AuthInterceptorService } from '../../interceptors/auth.interceptor';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="flex items-center justify-center mb-8 w-full">

                        <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" class="mb-5" style="width: 180px"/>
                        </div>
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">¡Bienvenido a !</div>
                            <span class="text-muted-color font-medium">Inicie sesión para continuar</span>
                        </div>

                        <div>
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Correo</label>
                            <input pInputText id="email1" type="text" placeholder="Tu correo" class="w-full md:w-[30rem] mb-8" [(ngModel)]="email" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Contraseña</label>
                            <p-password id="password1" [(ngModel)]="password" placeholder="Contraseña" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <p-button label="Iniciar sesión" styleClass="w-full" (onClick)="onLogin()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    email: string = '';

    password: string = '';

    checked: boolean = false;

    constructor(
        private router : Router, 
        private authService : AuthService,
        private authInterceptor : AuthInterceptorService
    ) {}

    onLogin(){
        console.log('Email: ', this.email);
        console.log('Password: ', this.password)
        this.authService.login(this.email, this.password).subscribe({
            next: (response : any) =>{
                localStorage.setItem('user',  JSON.stringify(response.user));
                this.authInterceptor.login(response.token);

                this.router.navigate(['/']);
            },
            error: error =>{
                console.log('Error: ', error);
            }
        })
    }
}
