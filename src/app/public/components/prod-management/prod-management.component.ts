import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/product';
import { ProductService } from '../../../services/product.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { CustomValidators } from './future-date.validator';
import { Message, MessageService, MessageType } from '../../../services/message.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingComponent],
  selector: 'app-prod-management',
  templateUrl: './prod-management.component.html',
  styleUrls: ['./prod-management.component.scss']
})
export class ProdManagementComponent implements OnInit{

  params: any;

  loading: boolean = false;
  validationInput: boolean = false;
  messages: Message[] = [];


  productForm = new FormGroup({
    id: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl("", [Validators.required]),
    date_release: new FormControl("", [Validators.required, CustomValidators['futureDate']()]),
    date_revision: new FormControl({value: "", disabled: true}, [Validators.required, CustomValidators.oneYearAfter('date_release')]),
  });
  
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, public messageService: MessageService) { 

  }

  ngOnInit(): void {
    console.log(this.route);
    const dateReleaseControl = this.productForm.get('date_release');

    if (dateReleaseControl) {
      dateReleaseControl.valueChanges.subscribe(value => {
        if (value) {
          const [year, month, day] = value.split('-').map(Number);
          const releaseDate = new Date(year, month - 1, day);
          const revisionDate = new Date(releaseDate);
          revisionDate.setFullYear(revisionDate.getFullYear() + 1);

          const revisionDateString = revisionDate.toISOString().split('T')[0];
          const dateRevisionControl = this.productForm.get('date_revision');
          if (dateRevisionControl) {
            dateRevisionControl.setValue(revisionDateString);
          }
        }
      });
    }

    this.route.queryParams.subscribe(params => {


      if (params['data']) {
        const base64String = params['data'];
        const jsonString = atob(base64String); 
        this.params = JSON.parse(jsonString);
        this.productForm.patchValue(this.params);
        console.log(this.params);

      }

      // this.params = params;
      console.log(this.params); 
      // this.productForm.patchValue(this.params);

      if (this.params) {
        this.productForm.get('id')?.disable();
      } else {
        this.productForm.get('id')?.enable();
      }
    });


    
  }


  onSubmit(){
    this.loading = true;
    console.log(this.productForm.getRawValue());

    if(!this.productForm.valid){
      this.productForm.markAllAsTouched(); 
      this.loading = false;
      return;
    }

    
    if (this.params) {
      console.log('entrando 1');
      this.update(this.productForm.getRawValue())
    }else{
      console.log('entrando 2');
      // this.verification(this.productForm.get('id') as any);
      this.create(this.productForm.getRawValue());
    }

    
  }

  async create(data: any){

    try {
      const resp:any = await firstValueFrom(this.productService.createProduct(data));
      console.log(resp);
      if (resp.data) {
        this.productForm.reset();
        this.showMessage('Producto creado con éxito', MessageType.Success, 'Éxito');
      }
      this.loading = false;
      
    } catch (error) {
      console.log(error);
      this.showMessage('Error al crear el producto', MessageType.Error, 'Error');
      this.loading = false;
      
    }
  }

  async update(data: any){

    try {
      const resp:any = await firstValueFrom(this.productService.updateProduct(data));
      console.log(resp);
      if (resp.data) {
        this.router.navigate(['/']);
        this.showMessage('Producto actualizado con éxito', MessageType.Success, 'Éxito');
      }
      this.loading = false;
      
    } catch (error) {
      console.log(error);
      this.showMessage('Error al actualizar el producto', MessageType.Error, 'Error');
      this.loading = false;
      
    }
  }

  async verification(data: any){
    const inputElement = data.target as HTMLInputElement;
    const id = inputElement.value;
    console.log(id);
    try {
      const resp:any = await firstValueFrom(this.productService.verificationProduct(id));
      console.log(resp);
      if (resp) {
        this.showMessage('El id ya existe', MessageType.Error, 'Error');
      }
      this.validationInput = resp;
      return;
      
    } catch (error:any) {
      console.log(error);
      this.showMessage(error, MessageType.Error, 'Error');

      
    }
  }

  reset(){
    const idValue = this.productForm.get('id')?.value;
  
    this.productForm.reset({
      id: idValue
    });
  }

  showMessage(message: string, type: any, summary: string) {
    this.messageService.add({
      severity: type,
      summary: summary,
      detail: message
    });
  }



}
