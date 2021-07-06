import { Component,OnInit,Input } from '@angular/core';
import { FormControl ,FormGroup,FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
import { CustomvalidationService } from '../services/customvalidation.service';
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { Router } from '@angular/router';

import{CorporateService} from './corporate.service';
const openC:any = [];
const cName:any=[];
const elmnt:any=[];
const color:any=[];

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.css']
})
export class CorporateComponent implements OnInit {
  title = 'angular';

   onclick() {
    openC(cName,elmnt,color);
  }
 

  registerForm !: FormGroup;
  loginForm !: FormGroup;

  currentEmail:any;

  constructor( private fb: FormBuilder, 
    private customValidator: CustomvalidationService,
    private corporateService : CorporateService,
    private router : Router){}

  ngOnInit(){
  

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      cpassword: ['', [Validators.required]],
      cb:['',Validators.requiredTrue]
    },
      {
        validator: this.customValidator.MatchPassword('password', 'cpassword'),
      }
    );

    this.loginForm = this.fb.group({
      email1:['',Validators.required,Validators.email],
      password1:['',Validators.required]
    })

  this.onChanges();

    window.onload=function(){
    $("#defaultOpen").click();
    }

  $(document).on("click", ".action-buttons .dropdown-menu", function(e){
       e.stopPropagation();
  });
  }
  onChanges(): void {
    this.registerForm.valueChanges.subscribe(val => {
     this.display="none";
    });
  }


  get registerFormControl() {
    return this.registerForm.controls;
    }

  get loginFormControl() {
      return this.loginForm.controls;
      }
   
  alreadyExists:any;
  display="none";

  async onSubmit(data:any) {
      const values={
        email:data.email,
        password:data.password,
        cpassword:data.cpassword
      }

    ;(await this.corporateService.submitValues(values)).subscribe(res=>{
      console.log(res);
      var bool=res;
       if(!bool){
         this.display="none";
         alert("Registered Succesfully! Please Login");
         window.location.reload();
        }
       else{
         this.display="block";
         this.alreadyExists="Email Id already Exists";
                

       }
    })

     
    }


    async loginSubmit(data1:any) {
      const values1={
        email1 : data1.email1,
        password1 : data1.password1
      }

    ;(await this.corporateService.loginValues(values1)).subscribe(resp=>{
      console.log(resp);
      var boole=resp;
       if(boole){
         //this.currentEmail=values1.email1;
         localStorage.emailId = values1.email1;
         
         this.router.navigate(['/homes']);   //Navigate to Search Companies Page
        }
       else{
       
        alert("Invalid Email or Password");
                

       }
    })

     
    }



    
 
}
