import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,FormsModule,HttpClientModule,CommonModule,NgbRatingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-web-application';
}
