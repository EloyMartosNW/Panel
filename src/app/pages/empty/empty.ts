import { User } from './../../core/models/user.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Table, TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { UserService } from '../../core/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { first, filter } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-empty',
    standalone: true,
    templateUrl: './empty.html',
        imports: [TableModule, ReactiveFormsModule, DialogModule, ProgressSpinnerModule,ButtonModule, TableModule, InputTextModule, SelectModule],
        styleUrls: ['./empty.scss']
})
export class Empty implements OnInit {
    valueList :User[] = [];
    loading = false
    form : FormGroup
    
    nationalityOptions = [
        {label: 'España', value: 'ES'},
        {label: 'Venezuela', value: 'VE'},
        {label: 'Colombia', value: 'CO'},
        {label: 'Peru', value: 'PE'},
        {label: 'Mexico', value: 'MX'},
        {label: 'Argentina', value: 'AR'},
        {label: 'Chile', value: 'CL'},
        {label: 'Ecuador', value: 'EC'},
        {label: 'Bolivia', value: 'BO'},
        {label: 'Paraguay', value: 'PY'},
        {label: 'Uruguay', value: 'UY'},
        {label: 'Brasil', value: 'BR'},
        {label: 'Panama', value: 'PA'},
        {label: 'Costa Rica', value: 'CR'},
        {label: 'Nicaragua', value: 'NI'},
        {label: 'Honduras', value: 'HN'},
        {label: 'El Salvador', value: 'SV'},
        {label: 'Guatemala', value: 'GT'},
        {label: 'Belice', value: 'BZ'},
        {label: 'Jamaica', value: 'JM'},
        {label: 'Haiti', value: 'HT'},
        {label: 'Republica Dominicana', value: 'DO'},
        {label: 'Cuba', value: 'CU'},
        {label: 'Puerto Rico', value: 'PR'},
        {label: 'Estados Unidos', value: 'US'},
        {label: 'Canada', value: 'CA'},
    ]

    selectedItem? : User

    formVisible : boolean = false;

    public constructor(
        private formBuilder : FormBuilder,
        private userService : UserService
    ) {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            is_provider: [false],
            last_name: ['', Validators.required],
            phone: ['', Validators.required],
            nationality: ['', Validators.required],
            actual_country: ['', Validators.required],
            actual_location: ['', Validators.required],
            description: [''],
            personal_url: ['']
        })
    }

    ngOnInit() {
        this.loadNotes(1);
    }

    showForm(item = null) {
        if(item){
            this.selectedItem = item;
            this.form.patchValue(item);
        }
        this.formVisible = true;
    }
    resetForm() {

    }

    scrollToBottom(){

    }
    
    onInput(table : Table, event : any){
        console.log('Input event', event);
        table.filter(event.target.value, 'name', 'contains');
    }

    saveItem(){
        if(this.selectedItem){
            this.selectedItem.name = this.form.value.name;
            this.selectedItem.email = this.form.value.email;
            this.selectedItem.is_provider = this.form.value.is_provider;
            this.selectedItem.last_name = this.form.value.last_name;
            this.selectedItem.phone = this.form.value.phone;
            this.selectedItem.nationality = this.form.value.nationality
            this.selectedItem.actual_country = this.form.value.actual_country;
            this.selectedItem.actual_location = this.form.value.actual_location;
            this.selectedItem.description = this.form.value.description;
            this.selectedItem.personal_url = this.form.value.personal_url;

            this.userService.updateUser(this.selectedItem).subscribe({
                next: (response : any) => {
                    console.log(response);
                },
                error: (error) => {
                    console.error(error);
                },
                complete: () => {
                    this.formVisible = false;
                }
            })
        }else{
            this.userService.updateUser(this.form.value).subscribe({
                next: (response : any) => {
                    console.log(response);
                },
                error: (error) => {
                    console.error(error);
                },
                complete: () => {
                    this.formVisible = false;
                }
            })
        }
    }

    isScrollAtBottom(){
        return false
    }

    onPageChange(event : any){

        console.log('Page change event', event);

        if(event.first >= this.valueList.length-10){
            this.loadNotes(event.first/10 + 1);
        }
    }

    loadNotes(page : any) {
        this.loading = true;
        
        this.userService.getUsers(page).subscribe({
            next: (response : any) => {
                console.log(response);
                if(page == 1){
                    this.valueList = response.data;
                }else{
                    this.valueList = this.valueList.concat(response.data.filter((ele : User)=>this.valueList.find(value=>value.id == ele.id) == undefined));
                }
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                this.loading = false;
            }
        })
    }

    showDeletingForm(item:any) {
        this.loading = true
        this.userService.deleteUser(item).subscribe({
            next: (response : any) => {
                console.log(response);
                this.valueList = this.valueList.filter(value => value.id != item.id);
            },
            error: (error) => {
                console.error(error);
                this.loading = false
            },
            complete: () => {
                this.loading = false;
            }
        })
    }
}
