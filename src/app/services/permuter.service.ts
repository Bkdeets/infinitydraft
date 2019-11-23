import { Player } from './../objects/Player';
import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { ThrowStmt } from '@angular/compiler';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PermuterService {
  players: Array<Player>;
  budget: number;
  gameType: String;
  teams: any;
  isReady: boolean;

  constructor(){}

  permute(players, budget, sport, game_type, number_of_lineups) {
    this.createPlayers(players);
    this.sortPlayers();
    return this.generatePerms(budget, number_of_lineups);
  }

  createPlayers(playersList){
    let players = [];
    for(let player of playersList.splice(1,playersList.length)){
      let fppg = player[8];
      if(fppg > 0){
        players.push(new Player(
          player[0],
          player[2],
          player[5],
          fppg,
          player[3]
        ));
      }
    }
    this.players = players;
  }

  sortPlayers(){
    this.players = this.players.sort(
      function(a,b) {
        return (a.FPPGRatio > b.FPPGRatio) ? 1 : ((b.FPPGRatio > a.FPPGRatio) ? -1 : 0);
      }
    );
  }

  processPositions(){
    for(let i=0; i < this.players.length; i++){
      if(this.players[i].Position == 'M/F'){
        this.players[i].Position = 'M'
            let playerCopy = Object.assign({}, this.players[i]);
            playerCopy.Position == 'F'
            this.players.push(playerCopy)
      }
    }
  }

  getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
  }

  sortTeams(teams){
    let sortedTeams = teams.sort((t1,t2) => {
      if (t1.score > t2.score) {
          return 1;
      }
      if (t1.score < t2.score) {
          return -1;
      }
      return 0;
    });
    return sortedTeams;
  }

  isPlayerInTeam(player, team){
    for(let p of team){
      if(p.Id == player.Id){
        return true;
      }
    }
    return false;
  }

  generatePerms(budget, number_of_lineups){
    this.processPositions();
        
    let teams = [];
    let scores = [];
    let iterations = 0;
    while(teams.length < 1000 && iterations < 10000000){
      let playersCopy: Array<Player> = Object.assign([], this.players);
      playersCopy = playersCopy.splice(0,Math.round(playersCopy.length/2));
      let budgetCopy = budget;
      let limits = {
          D: 2,
          M: 2,
          F: 2,
          UTIL:1,
          GK: 1
      };
      let team = [];
      let teamIterations = 0;
      while(team.length < 8 && teamIterations < 100000 && iterations < 10000000){
        teamIterations += 1;
        iterations += 1;
        let player: Player;
        let randIndex = this.getRandomInt(playersCopy.length);
        while(!player){
          randIndex = this.getRandomInt(playersCopy.length);
          player = playersCopy[randIndex];
        }
        let inBudget: Boolean = player.Salary < budgetCopy;
        let inTeam: Boolean = this.isPlayerInTeam(player, team);
        if(limits[player.Position] > 0 && inBudget && !inTeam){
          team.push(player);
          limits[player.Position] -= 1;
          budgetCopy -= player.Salary;
          delete playersCopy[randIndex];
        } else if(limits['UTIL'] > 0 && player.Position != 'GK' && inBudget && !inTeam){
          team.push(player);
          limits['UTIL'] -= 1;
          budgetCopy -= player.Salary;
          delete playersCopy[randIndex];
        }
      }
      let numbers = team.map(i => i.FPPG);
      let score = 0;
      for(let n of numbers){
        score += +n;
      }
      if(scores.length > 0){
        if(score >= Math.max(...scores)){
          teams.push({
            team: team,
            score: score
          });
          scores.push(score);
        }
      } else {
        teams.push({
          team: team,
          score: score
        });
        scores.push(score);
      }
    }
    return this.sortTeams(teams).reverse().splice(0, number_of_lineups);
  }
}
