import { ModalService } from '../../modules/modal/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  modalService: ModalService;

  constructor(modalService: ModalService) {
    this.modalService = modalService;
   }

  ngOnInit() {
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  showMenuDropdown() {
    document.getElementById("id-dropdown").classList.toggle("show");
  }
}
