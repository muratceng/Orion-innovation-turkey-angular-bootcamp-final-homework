import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/User.model";
import { UserService } from "src/app/services/UserService.service";

@Component({
    selector: 'SignUp-selector',
    templateUrl: './SignUp.component.html',
    styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {
    constructor(private userService: UserService, private router:Router) { }
   
    passError=''
    signUpForm!:FormGroup;
    users!:User[];


    ngOnInit(): void {
        // eğer kullanıcı girişi varsa dashboarda yönlendirir.
        if(this.userService.isLogIn()){
            this.router.navigate(['/Dashboard']);
        }

        this.userService.getUserList().subscribe((res)=>{
            this.users = res as User[];
        })

        this.createForm();
    }
   
    //formgroup tanımlanmıştır ve her alan için validasyon işlemleri tanımlanmıştır.
    createForm(){
        this.signUpForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
            passwordCheck: new FormControl(null, [Validators.required])
        });
    }
   

    // öncelikle formdan alınan iki şifrenin eşit olmasına bakar eğer eşitse kullanıcıyı jsona ekler sayfayı giriş ekranına yönlendirir.    
    onSubmit() {
        let pass=this.signUpForm.get('password')?.value;
        let passCheck=this.signUpForm.get('passwordCheck')?.value;

        if(this.emailCheck()){
            if(pass == passCheck){
                let user = {
                    name: this.signUpForm.get("name")?.value,
                    email: this.signUpForm.get("email")?.value,
                    password: this.signUpForm.get("password")?.value
                }
                this.userService.addUser(user).subscribe((res)=>{
                    console.log(res);
                    this.router.navigate(['/SignIn'])
                })
            }else{
                this.passError ="Password does not match ";
            }
        }else{
            this.passError ="This email already have an account ";
        }
        
    }

    // database de aynı emaile kayıtlı kişi var mı diye kontrol eder.
    emailCheck(){
        let check=true;
        for(let i=0;i<this.users.length;i++){
            if(this.signUpForm.get('email')?.value == this.users[i].email){
                check=false;
            }
        }
        return check;
    }

    //sayfayı giriş ekranına yönlendirir.
    signIn(){
        this.router.navigate(['/SignIn']);
    }

}