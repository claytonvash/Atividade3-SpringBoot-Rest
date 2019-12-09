import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.auth.isAuthenticated()) {
      this.router.navigate(['principal']);
    }

  }

  doLogin() {
    this.auth.login(this.form.get('email').value, this.form.get('password').value)
      .toPromise()
      .then(dados => {
        localStorage.setItem('jwt', JSON.stringify(dados));
        this.router.navigate(['principal']);
      }).catch(error => {

        if (error.status === 401) {
          alert('Usuário ou senha inválido!');
        } else {
          alert('Erro interno, contacte o administrador!');
        }

      });
  }
}
