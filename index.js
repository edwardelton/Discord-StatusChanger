'use strict';

import DiscordUser from './class/DiscordStatus.js';
import dotenv from 'dotenv';
import { createInterface } from 'readline';

dotenv.config({ path: './config/config.env' });

const CLIENT = new DiscordUser();

export function askStatusMode() {
  const readline = createInterface(process.stdin, process.stdout);

  readline.question(
    '[1] Streaming, [2] Listening, [3] Watching, [4] Competing, [5] Playing, [6] Custom\nSelect your status mode: ',
    (answer) => {
      answer = parseInt(answer);

      readline.close();

      if (answer >= 1 && answer <= 6) {
        handleStatus(answer);
      } else {
        console.log('\nInvalid input. Please enter a number between 1 to 6.\n');
        askStatusMode();
      }
    }
  );
}

function handleStatus(answer) {
  switch (Number(answer)) {
    case 1:
      CLIENT.setStreamingMode();
      break;
    case 2:
      CLIENT.setListeningMode();
      break;
    case 3:
      CLIENT.setWatchingMode();
      break;
    case 4:
      CLIENT.setCompetingMode();
      break;
    case 5:
      CLIENT.setPlayingMode();
      break;
    case 6:
      CLIENT.setCustomMode();
      break;
  }
}

async function main() {
  await CLIENT.login(process.env.TOKEN);
  CLIENT.onReady();
}

main();
