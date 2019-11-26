/// <reference lib="webworker" />

import { parse } from 'papaparse';
import { PermuterService } from './services/permuter.service';

addEventListener('message', ({ data }) => {
  let permuter = new PermuterService();
  parse(data.file, {
    complete: (results) => {
      let teams = permuter.permute(
        results.data, 
        data.budget,
        data.sport,
        data.game_type,
        data.number_of_lineups,
        data.fppgRange);
      postMessage(teams);
    }
  })
});
