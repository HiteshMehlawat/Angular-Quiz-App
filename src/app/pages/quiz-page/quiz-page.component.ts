import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  uname: string | null = localStorage.getItem('uname');
  uemail: string | null = localStorage.getItem('uemail');

  questionArray :any[]=[
        { 
          'questionNumber':1,
          'questionLabel':"Which of the following is not a datatype in typescript?",
          'options': [
            {
              'label':'date',
              'correct':true
            },
            {
              'label':'void'
            },
            {
              'label':'number'
            },
            {
              'label':'string'
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':2,
          'questionLabel':"Angular is primarily considered as?",
          'options': [
            {
              'label':'A JavaScript Framework',
              'correct':true
            },
            {
              'label':'A CSS Framework'
            },
            {
              'label':'A content management system'
            },
            {
              'label':'A database system'
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':3,
          'questionLabel':"Which Angular decorator is used to listen to DOM events?",
          'options': [
            {
              'label':'@Output()',
              
            },
            {
              'label':'@Input()'
            },
            {
              'label':'@Event()'
            },
            {
              'label':'@HostListener()',
              'correct':true
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':4,
          'questionLabel':"How do you bind data to an attribute in Angular?",
          'options': [
            {
              'label':'{{variable}}',
              
            },
            {
              'label':' (variable)'
            },
            {
              'label':'[variable]',
              'correct':true
            },
            {
              'label':'=variable=',
              
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':5,
          'questionLabel':"Which of the following is a core component in an Angular application?",
          'options': [
            {
              'label':'ViewController',
              
            },
            {
              'label':' Directive',
              'correct':true
            },
            {
              'label':'Activity',
              
            },
            {
              'label':'Observer',
              
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':6,
          'questionLabel':"What does a pipe do in Angular?",
          'options': [
            {
              'label':'Connects two components',
              
            },
            {
              'label':'Transforms data in the template',
              'correct':true
            },
            {
              'label':'Merges streams of data',
              
            },
            {
              'label':'Opens a direct connection to the server',
              
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':7,
          'questionLabel':"How can you fetch data from a server or database in Angular?",
          'options': [
            {
              'label':'Using the HTTPModule',
              'correct':true
            },
            {
              'label':'Using the FetchAPI',
              
            },
            {
              'label':'Using the ServerModule',
              
            },
            {
              'label':'Using the DatabaseModule',
              
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':8,
          'questionLabel':"What is the use of Angular Directives?",
          'options': [
            {
              'label':'To inject services',
              
            },
            {
              'label':'To initialize component state',
              
            },
            {
              'label':'To manipulate the DOM elements',
              'correct':true
            },
            {
              'label':'To store data',
              
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':9,
          'questionLabel':"How do you define a route in Angular?",
          'options': [
            {
              'label':'Using <a> tags',
              
            },
            {
              'label':'Using the Router service',
              
            },
            {
              'label':'Using the @Route() decorator',
            },
            {
              
              'label':'Using the Routes array',
              'correct':true
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        { 
          'questionNumber':10,
          'questionLabel':"Which decorator allows you to define styles for a component?",
          'options': [
            {
              'label':'@Style()',
              
            },
            {
            
              'label':'@Component({styles: ...})',
              'correct':true
              
            },
            {
              'label':'@ComponentStyle()',
            },
            {
              'label':'@ViewStyle()',
              
            }
          ],
          'selectedOption': null,
          'isBlocked': false,   
          'timeLeft': 10  
        },
        
      ];

  currentQuestion: number = 0;
  score: number = 0;
  counter: number = 10;
  quentionIntervals$: Subscription = new Subscription();
  alertShown: boolean = false;

  constructor(private router:Router) {
    
  }
  ngOnInit(): void {
    this.startCounter();
  }

  previousQuesn() {
    if (this.currentQuestion > 0) {
      if (!this.questionArray[this.currentQuestion - 1].isBlocked) {
        this.currentQuestion--;
        this.resetCounter();
      }
    }
  }

    nextQuesn() {
      // Check if the current question is not the last one
    // if(this.currentQuestion !== this.questionArray.length-1){
      if (this.currentQuestion < this.questionArray.length - 1) {

         // Save the remaining time for skipped questions
        if (!this.questionArray[this.currentQuestion].selectedOption && this.counter > 0) {

          this.questionArray[this.currentQuestion].timeLeft = this.counter; // Save the remaining time for skipped questions
        }

        // Move to the next question
        this.currentQuestion++;
        this.resetCounter();// Reset the timer for the next question
      // }

    }else{
      // Quiz is complete
      const attemptedQuestions = this.questionArray.filter(q => q.selectedOption !== null).length;

      // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('uname') !== null;

    if (isLoggedIn && !this.alertShown) {
      alert('Quiz Completed!! It will Automatically Redirect to Result Page');
      this.alertShown = true; // Prevents the alert from showing again
    }

      this.router.navigate(['result'], {
        queryParams: {
          score: this.score,
          attempted: attemptedQuestions,
          total: this.questionArray.length
        }
      });
    
   }
  }

  onClickChange(index: number) {
    if (!this.questionArray[index].isBlocked) {
      this.currentQuestion = index;
      this.counter = this.questionArray[index].timeLeft;  // Resume from where left off
      this.resetCounter(false);                           // Resume without fully resetting
    }
  }

  onSelect(option: any, question: any) {
    if (question.isBlocked) return;

    // If the current selection is correct and hasn't been selected before, increment score
  if (option.correct && question.selectedOption !== option.label) {
    
    this.score++; // Increment score if selecting a correct option for the first time

  } else if (!option.correct && question.selectedOption === option.label) {
    // If the user unselects the correct option, decrement the score
    this.score--;
  }
  console.log('scrore' +this.score);
  // Update the selected option to the newly selected one
  question.selectedOption = option.label;
  }

  startCounter() {
    this.quentionIntervals$ = interval(1000).subscribe(() => {
      this.counter--;
      if (this.counter === 0) {
        this.questionArray[this.currentQuestion].isBlocked = true; // Block the question on timeout
        this.nextQuesn();// Move to next question
      }
    });
  }

  resetCounter(resetTime: boolean = true) {
    if (resetTime) {
      this.counter = this.questionArray[this.currentQuestion].timeLeft || 10;  // Reset or resume time
    }
    if (this.quentionIntervals$) {
      this.quentionIntervals$.unsubscribe();// Stop the current timer
    }
    this.startCounter();// Start the timer again for the next question
  }
}
