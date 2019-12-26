import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FilterComponent } from './pages/filter/filter.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/notFound/notFound.component';
import { HomeHeaderComponent } from './pages/home/home-header/home-header.component';
import { HomeFilterComponent } from './pages/home/home-filter/home-filter.component';
import { HomeRankComponent } from './pages/home/home-rank/home-rank.component';
import { FilterHeaderComponent } from './pages/filter/filter-header/filter-header.component';
import { FilterConditionComponent } from './pages/filter/filter-condition/filter-condition.component';
import { RcaDialogComponent } from './dialogs/rca-dialog/rca-dialog.component';
import { FilterResultComponent } from './pages/filter/filter-result/filter-result.component';
import { FilterResultItemComponent } from './pages/filter/filter-result/filter-result-item/filter-result-item.component';
import { HomeRcaRankComponent } from './pages/home/home-rank/home-rca-rank/home-rca-rank.component';
import { HomeKeywordRankComponent } from './pages/home/home-rank/home-keyword-rank/home-keyword-rank.component';
import { HomeKeywordItemComponent } from './pages/home/home-rank/home-keyword-rank/home-keyword-item/home-keyword-item.component';
import { HomeRcaItemComponent } from './pages/home/home-rank/home-rca-rank/home-rca-item/home-rca-item.component';
import { RcaPanelComponent } from './dialogs/rca-panel/rca-panel.component';

@NgModule({
   declarations: [
      AppComponent,
      FilterComponent,
      HomeComponent,
      LoginComponent,
      NotFoundComponent,
      HomeHeaderComponent,
      HomeFilterComponent,
      HomeRankComponent,
      FilterHeaderComponent,
      FilterConditionComponent,
      RcaDialogComponent,
      FilterResultComponent,
      FilterResultItemComponent,
      HomeRcaRankComponent,
      HomeKeywordRankComponent,
      HomeKeywordItemComponent,
      HomeRcaItemComponent,
      RcaPanelComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      A11yModule,
      CdkStepperModule,
      CdkTableModule,
      CdkTreeModule,
      DragDropModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
      PortalModule,
      ScrollingModule,
      FormsModule, 
      ReactiveFormsModule,
   ],
   entryComponents: [RcaDialogComponent],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
