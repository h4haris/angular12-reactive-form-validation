import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from './utils/validation';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
  title = 'angular12-reactive-form-validation';

  form!: FormGroup;
  submitted = false;

  constructor ( private formBuilder: FormBuilder ) { }

  ngOnInit (): void {
    this.form = this.formBuilder.group(
      {
        fullname: [ '', Validators.required ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength( 6 ),
            Validators.maxLength( 20 )
          ]
        ],
        email: [ '', [ Validators.required, Validators.email ] ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength( 6 ),
            Validators.maxLength( 40 )
          ]
        ],
        confirmPassword: [ '', Validators.required ],
        acceptTerms: [ false, Validators.requiredTrue ]
      },
      {
        validators: [ Validation.match( 'password', 'confirmPassword' ) ]
      }
    );
  }

  get f (): { [ key: string ]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit (): void {
    this.submitted = true;

    if ( this.form.invalid ) {
      return;
    }

    console.log( JSON.stringify( this.form.value, null, 2 ) );
  }

  onReset (): void {
    this.submitted = false;
    this.form.reset();
  }
}
