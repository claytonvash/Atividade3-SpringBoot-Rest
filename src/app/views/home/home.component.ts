import { Component, OnInit, Output, Input } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output()
  userActive: boolean;
  @Output()
  productActive: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }

}
