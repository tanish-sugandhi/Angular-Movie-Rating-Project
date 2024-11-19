import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModalConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [HeaderComponent,HttpClientModule,NgbRatingModule,CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
[x: string]: any;
   type='';
   id='';
   url='';
   movies:any;
   movie:any;
  constructor(private route:ActivatedRoute,private http:HttpClient,private router:Router,config: NgbModalConfig,
   private modalService: NgbModal){
      config.backdrop = 'static';
		config.keyboard = false;
  }
  ngOnInit(): void {
   this.type=this.route.snapshot.params['type'];
   this.id=this.route.snapshot.params['id'];
   if(this.type === 'trending'){
      this.url='http://localhost:4200/assets/data/trending-movies.json';
   }
   if(this.type === 'theatre'){
      this.url='http://localhost:4200/assets/data/theatre-movies.json';
   }
   if(this.type === 'popular'){
     this.url='http://localhost:4200/assets/data/popular-movies.json';
   }
     this.getMovie();
  }
  getMovie(){
      this.http.get(this.url).subscribe((movies)=>{
        this.movies=movies;
        let index=this.movies.findIndex((movie:{id:String})=>movie.id==this.id);
        if(index>-1){
            this.movie=this.movies[index];
        }
      })
  }
  goToHome(){
     this.router.navigate(['home']);
  }
  goToSubmit(){
     alert('Thank you for your feedback!');
      
  }

}
