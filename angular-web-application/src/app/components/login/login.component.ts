import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
     username="";
     password="";
     errorMsg="";
     errorPassword=""
    constructor(private auth:AuthService,private  router:Router){
    }
    login(){
       if(this.username.trim().length===0 && this.password.trim().length===0 ){
           this.errorMsg="username is required";
           this.errorPassword="password is required";
       }
       else if(this.username.trim().length===0){
           this.errorMsg="username is required";
       }
       else if(this.password.trim().length===0){
        this.errorPassword="password is required";
       }
       else{
        this.errorMsg="";
        this.errorPassword="";
         let res=this.auth.login(this.username,this.password);
         if(res==200)
         {
             this.router.navigate(['home'])
         }
        if(res==403){
          this.errorMsg="Invalid Username and Password";
         }
       }
    }

}
