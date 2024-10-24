import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { PageNoteFoundComponent } from './pages/page-note-found/page-note-found.component';
import { ResultComponent } from './pages/result/result.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent,
        title:'Login Page'
    },
    {
        path:'quizPage',
        component:QuizPageComponent,
        title:'Quiz-App',
        canActivate:[AuthGuard]
    },
    {
        path:'result',
        component:ResultComponent,
        title:'Result Page',
        canActivate:[AuthGuard]
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'**',
        component : PageNoteFoundComponent,
        title:'Error 404', 
        
    },
];
