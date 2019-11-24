import { ModalService } from '../../modules/modal/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  modalService: ModalService;
  constructor(modalService: ModalService) {
    this.modalService = modalService;
   }

  ngOnInit() {
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
