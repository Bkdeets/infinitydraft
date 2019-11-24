import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modules/modal/modal.service';

@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss']
})
export class HowToUseComponent implements OnInit {
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
