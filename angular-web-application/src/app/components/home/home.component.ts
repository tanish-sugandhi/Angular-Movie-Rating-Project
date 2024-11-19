
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, HttpClientModule,NgbRatingModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  trendingMovies: any;
  theaterMovies:any;
  popularMovies:any;
  selectedMovies:any;
  reviewData={name:'',rating:0,reviews:''}
  count=0;
  constructor(private http: HttpClient,private router:Router,config: NgbModalConfig,
		private modalService: NgbModal) {
      config.backdrop = 'static';
		  config.keyboard = false;
    }

  ngOnInit(): void {
     this.getTrendingMovies();
     this.getTheatreMovies();
     this.getPopularMovies();
  }

  getTrendingMovies(): void {
    this.http.get('http://localhost:4200/assets/data/trending-movies.json')
      .subscribe({
        next: (movies) => {
          this.trendingMovies = movies;
          console.log(this.trendingMovies);
        },
        error: (error) => {
          console.error('Error fetching trending movies:', error);
        }
      });
  }
  getTheatreMovies():void{
    this.http.get('http://localhost:4200/assets/data/theatre-movies.json')
    .subscribe({
       next:(movies)=>{
        this.theaterMovies=movies;
        console.log(this.theaterMovies);
       },error:(err)=>{
        console.error('Error fetching theatre movies:', err);
       }
    })
  }
  getPopularMovies():void{
    this.http.get('http://localhost:4200/assets/data/popular-movies.json')
    .subscribe((movies)=>{
      this.popularMovies=movies;
      console.log(this.popularMovies);
    })
  }
   goToMovies(type:string,id:string){
      this.router.navigate(['movie',type,id]);
   }
   open(content:any,movie:any) {
    this.selectedMovies=movie;
    this.reviewData = { name: '', rating: 0, reviews: '' };
		this.modalService.open(content);
    
	}
  submitRating(close:any){
    if (this.selectedMovies) {
     this.selectedMovies.rating=this.reviewData.rating;
     this.count++;
     close('rating successfully');
    }
  }
}




