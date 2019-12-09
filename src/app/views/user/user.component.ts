import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { UserInsert } from 'app/shared/interfaces/user-insert';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private service: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }

  Save() {
    const user: UserInsert = {
      id: 0,
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      password: this.form.get('password').value
    };

    this.service.insert(user).subscribe(response => {
      if (response.id) {
        alert('Usuário salvo com sucesso!');
        this.ClearFields();
      }
    },
      err => {
        console.log('Erro callback:  ' + err.message);
      });
  }

  private ClearFields() {
    this.form.get('name').setValue('');
    this.form.get('email').setValue('');
    this.form.get('phone').setValue('');
    this.form.get('password').setValue('');
  }

}
