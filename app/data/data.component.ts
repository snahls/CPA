import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import {DataService} from './data.service';
@Component({
  selector: 'app-data',
  templateUrl:'./data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private dataService : DataService) { }
  title=localStorage.title;
  about=localStorage.about;
  tab=localStorage.tab
  heading=localStorage.heading;

  nodeNames =[];
  ngOnInit(): void {
    //Converting string to HTML Format
    var $log = $( "#log" ),
    str = this.tab,
    html = $.parseHTML( str)
    this.nodeNames = [];  
  // Append the parsed HTML
     $log.append( html );
  
  }


  async Sentimental(){
    const companyName={
      compName : localStorage.cname
    }

    ;(await this.dataService.getPosts(companyName)).subscribe(res=>{
        
    var score = res.score;
    var comparative = res.comparative;
    //  var text = res.text;
     
    alert("Score : " + score + " Comparative : " + comparative);


    })
  }
  
}
