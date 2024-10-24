import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent  {

  score: number = 0;
  attemptedQuestions: number = 0;
  totalQuestions: number = 0;
  resultMsg: string='';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.score = +params['score'];
      this.attemptedQuestions = +params['attempted'];
      this.totalQuestions = +params['total'];
    });
    if(this.score >= 6){
      this.resultMsg ="🎉 Congratulations. You passed!"
    }else{
      this.resultMsg="👎 Oops! You didn't pass this time."
    }
  };
}
