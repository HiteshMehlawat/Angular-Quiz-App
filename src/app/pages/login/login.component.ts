import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isLoggedIn } from '../../auth.signal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

UserData :any ={
  userName : '',
  userEmail : ''
}
constructor(private route : Router){
}

  onLogin(){
    if(this.UserData.userName !== '' && this.UserData.userEmail !==''  ){
      alert("Login Sucessfully");
      localStorage.setItem('uname' ,this.UserData.userName);
      localStorage.setItem('uemail' ,this.UserData.userEmail);
      isLoggedIn.set(true);
      this.route.navigateByUrl('quizPage');
    }
    else{
      alert("Please Enter Both the Fields !!")
    }
  }
  

}
