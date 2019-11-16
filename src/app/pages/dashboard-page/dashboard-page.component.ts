import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  uploadedFile: any;

  constructor() { }

  ngOnInit() {
    this.uploadedFile = {
      name: '~/dx_salaries.csv'
    }
  }

  handleFileUpload(){
    this.changeFileInputPlaceholderTextColor();
    const file = document.getElementById('inputGroupFile01').files[0];
    console.log(file);
    this.uploadedFile = file;
  }
  changeFileInputPlaceholderTextColor(){
    const elem = document.getElementById('fileInputPlaceholder');
    elem.style.color = "black";
  }

}
