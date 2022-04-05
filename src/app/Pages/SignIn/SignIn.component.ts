import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/User.model";
import { UserService } from "src/app/services/UserService.service";

@Component({
    selector: 'SignIn-selector',
    templateUrl: './SignIn.component.html',
    styleUrls: ['./SignIn.component.css']
})
export class SignInComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) { }

    users : User[]=[];
    signInForm!:FormGroup;
    errors: String = '';

    ngOnInit(): void {
        //Kullanıcı girişi varsa sayfayı dashboarda yönlendirir.
        if(this.userService.isLogIn()){
            console.log("kullanıcı var")
            this.router.navigate(['./Dashboard'])
        }
        
        this.createForm();

        //kullanıcı listesi doldurulur.
        this.userService.getUserList().subscribe((res) => {
            this.users = res as User[];
        });
    }

    //formgroup tanımlanmıştır ve her alan için validasyon işlemleri tanımlanmıştır.
    createForm(){
        this.signInForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        })
    }
    

    //kullanıcı eğer kullanıcı listesinde varsa local storage e yazılır ve dashboarda yönlendirilir.
    onSubmit() {
        if(this.checkUser()){
            let user = this.users.find((user)=>user.email==this.signInForm.get('email')?.value)
            this.userService.writeLocalStorage(user as User);
            this.router.navigate(['/Dashboard']);
        }else{
            this.errors ='email or password is not correct'
        }
        
    }

    // kullanıcı listesindeki email ve sifre eslesmesi durumunda true aksi halde false döndürür.
    checkUser(){
        let isLogged=false;
        this.users.map((user) => {
            if (this.signInForm.get("email")?.value == user.email && this.signInForm.get("password")?.value == user.password) {
                isLogged=true;
            }
        })
        return isLogged;
    }

    

    // kayıt formuna yönlendirir.
    signUp() {
        this.router.navigate(['/SignUp']);
    }

}