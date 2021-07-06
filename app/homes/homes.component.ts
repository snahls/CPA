import { Component, OnInit ,Input} from '@angular/core';
import {HomesService} from './homes.service';

        
import {​​​​​ Router, ActivatedRoute}​​​​​ from'@angular/router';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {

  opt="COMPANY";
  constructor(private homesService : HomesService,private router: Router) { }    
  cname:any;
 // opt:any;
  emailId = localStorage.emailId;
  
  async Search(){
    const newContact= {
      cname:this.cname,
      opt:this.opt
    }
    ;(await this.homesService.getPosts(newContact)).subscribe(res=>{

     var title=res.title;
     var about=res.div;
     var heading=res.h2;
     var tab=res.table;


      localStorage.cname=newContact.cname;
      //alert(localStorage.cname);
      localStorage.title=title;
      localStorage.about=about;
      localStorage.heading=heading;
      localStorage.tab=tab;

     // alert();
  
     this.router.navigate(['homes/details']);
  
   
  })
  
}




  ngOnInit(): void {
    //Toggle when we click on emailid or profile image
    $(".profile .icon_wrap").click(function(){
      $(this).parent().toggleClass("active");
    });
  }




}
