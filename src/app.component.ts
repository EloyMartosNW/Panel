import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './app/layout/service/layout.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    
    constructor(public layoutService: LayoutService) {
        var theme = localStorage.getItem('darkMode');
        if (theme) {
            this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: theme === 'true' }));
        }
    }
}
