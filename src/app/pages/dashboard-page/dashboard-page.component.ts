import { ModalService } from '../../modules/modal/modal.service';
import { PermuterService } from './../../services/permuter.service';
import { ApiWrapperService } from './../../services/api-wrapper.service';
import { Component, OnInit } from '@angular/core';
import { parse } from 'papaparse';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  uploadedFile: any;
  uploadResults: any;
  wrapper: ApiWrapperService;
  permuter: PermuterService;
  teams: any;
  modalService: ModalService;

  formValues: any;


  constructor(
    wrapper: ApiWrapperService,
    modalService: ModalService) {
    this.wrapper = wrapper;
    this.modalService = modalService;
    this.permuter = new PermuterService();
    this.permuter.budget = 50000;
    this.formValues = {};
   }

  ngOnInit() {
    this.uploadedFile = {
      name: 'dk_salaries.csv',
      isDemo: true
    }
  }

  handleFileUpload(files: FileList){
    this.changeFileInputPlaceholderTextColor();
    const file = files[0];
    this.uploadedFile = file;
  }

  changeInput(event, inputId){
    this.formValues[inputId] = event.target.value;
  }

  handlePermuteClick(){
    if(this.uploadedFile.isDemo){
      console.log('no file -- build an alert box');
    }

    if (typeof Worker !== 'undefined') {
      const worker = new Worker('./../../permuter.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.teams = data;
      };
      worker.postMessage({
        file: this.uploadedFile,
        budget: +this.formValues.budget,
        sport: this.formValues.sport,
        game_type: this.formValues.game_type,
        number_of_lineups: this.formValues.number_of_lineups
      });
    } else {
      console.log('Web Workers are not supported in this environment.');
      parse(this.uploadedFile, {
        complete: (results) => {
          this.teams = this.permuter.permute(
            results.data, 
            +this.formValues.budget,
            this.formValues.sport,
            this.formValues.game_type,
            this.formValues.number_of_lineups);
        }
      });
    }
  }
    
  changeFileInputPlaceholderTextColor(){
    const elem = document.getElementById('fileInputPlaceholder');
    elem.style.color = "black";
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
