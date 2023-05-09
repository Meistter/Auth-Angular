import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: RequestStatus = 'init';
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
   
  ) { }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.authService.recovery(email)
      .subscribe({
        // esta semantica usando next nos permite ver las dos opciones, cuando falla y cuando es exitoso
        next: (data) => {
          this.status = 'success'
          this.emailSent = true
          console.log(data);
          
        },
        error: () =>{
          this.status = 'failed'
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

}
