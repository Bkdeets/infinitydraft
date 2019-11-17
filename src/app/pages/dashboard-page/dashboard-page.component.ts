import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  uploadedFile: any;
  uploadResults: any;

  constructor() { }

  ngOnInit() {
    this.uploadedFile = {
      name: 'dk_salaries.csv'
    }
  }

  handleFileUpload(){
    this.changeFileInputPlaceholderTextColor();
    const file = document.getElementById('inputGroupFile01').files[0];
    this.uploadedFile = file;
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        document.getElementById("uploadResult").innerHTML = evt.target.result;
      }
      reader.onerror = function (evt) {
          document.getElementById("uploadResult").innerHTML = "error reading file";
      }
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  }
    
  changeFileInputPlaceholderTextColor(){
    const elem = document.getElementById('fileInputPlaceholder');
    elem.style.color = "black";
  }
}
