import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from './pages/filter/filter.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/notFound/notFound.component';
import { DetailRcaComponent } from './pages/detail-rca/detail-rca.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: 'filter', component: FilterComponent },
  { path: 'rca', component: DetailRcaComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
