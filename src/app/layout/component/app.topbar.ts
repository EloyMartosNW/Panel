import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-topbar',
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, ButtonModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                
                <span>Nombre del sitio</span>
            </a>
        </div>

        <div class="layout-topbar-actions" style="align-items: center;">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
                <button
                    pButton
                    [label]="user"
                    icon="pi pi-power-off"
                    class="p-button-rounded p-button-raised mb-2"
                    routerLink="/auth/login"
                ></button>
            </div>
            
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    user : string = 'Administrador';
    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {

        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
        var actualDarkMode = this.layoutService.isDarkTheme();
        localStorage.setItem('darkMode', actualDarkMode==true ? 'true' : 'false');    
    }
}
