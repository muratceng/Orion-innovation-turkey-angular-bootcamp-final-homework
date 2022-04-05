import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './Components/Card/Card.component';
import { DashboardComponent } from './Pages/Dashboard/Dashboard.component';
import { SignInComponent } from './Pages/SignIn/SignIn.component';
import { SignUpComponent } from './Pages/SignUp/SignUp.component';
import { ProductDetailsComponent } from './Pages/ProductDetails/ProductDetails.component';
import { NavbarComponent } from './Components/Navbar/Navbar.component';
import { FooterComponent } from './Components/Footer/Footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './Components/Carousel/Carousel.component';
import { CardDetailsComponent } from './Pages/CardDetails/CardDetails.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    CardComponent,
    ProductDetailsComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    CardDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
