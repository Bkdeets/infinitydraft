import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-display',
  templateUrl: './team-display.component.html',
  styleUrls: ['./team-display.component.scss']
})
export class TeamDisplayComponent implements OnInit {
  @Input() team: any;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
