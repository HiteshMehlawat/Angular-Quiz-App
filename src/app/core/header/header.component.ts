import { Component, OnInit, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isLoggedIn } from '../../auth.signal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  uname =localStorage.getItem('uname');   
  uemail =localStorage.getItem('uemail');
  isLoggedIn = isLoggedIn;
  constructor(private router: Router){
    
  }
  ngOnInit(): void {
    this.updateLoginStatus();
  }
  
  onLogOut(){
    localStorage.removeItem('uname');
    localStorage.removeItem('uemail');
    isLoggedIn.set(false); 
    this.updateLoginStatus();
    this.router.navigateByUrl('login');
  }
  updateLoginStatus() {
    this.uname = localStorage.getItem('uname');
    this.isLoggedIn.set(!!this.uname); // Set signal based on localStorage
  }
}
