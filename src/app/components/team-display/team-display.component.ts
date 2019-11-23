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

  copy(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyIds(){
    let format = ['F','F','M','M','D','D','GK','UTIL']
    let positionsString = '';
    let pos = {
      F: [],
      M: [],
      D: [],
      GK: []
    }
    let players = this.team.team;
    for(let player of players) {
      pos[player.Position].push(player.Id)
    }
    let ending = '';
    let csvString = '';
    let index = 0;
    for (var prop in pos) {
      if (Object.prototype.hasOwnProperty.call(pos, prop)) {
        if(pos[prop].length > 2) {
          ending = pos[prop].pop();
        }
        for(let id of pos[prop]){
          if(index == 0){
            csvString += id;
            index += 1;
          }
          else {
            csvString += ','+id;
          }
        }
      }
    }
    csvString += ',' + ending;
    this.copy(csvString);
    this.showPositions()
  }
  showPositions(){
    let format = ['F','F','M','M','D','D','GK','UTIL']
    let pos = {
      F: [],
      M: [],
      D: [],
      GK: []
    }
    let players = this.team.team;
    for(let player of players) {
      pos[player.Position].push(player.Position)
    }
    let ending = '';
    let csvString = '';
    let index = 0;
    for (var prop in pos) {
      if (Object.prototype.hasOwnProperty.call(pos, prop)) {
          if(pos[prop].length > 2) {
            ending = pos[prop].pop();
          }
          for(let id of pos[prop]){
            if(index == 0){
              csvString += id;
              index += 1;
            }
            else {
              csvString += ','+id;
            }
          }
      }
    }
    console.log(csvString+','+ending);
  }

}
