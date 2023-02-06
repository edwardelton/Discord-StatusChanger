'use strict';

import { Client, CustomStatus } from 'discord.js-selfbot-v13';
import { readFileSync } from 'fs';
import { askStatusMode } from '../index.js';
import { interval } from '../spinner/spinner.js';

export default class DiscordUser {
  constructor() {
    this.client = new Client({
      checkUpdate: false,
    });
    this.config = JSON.parse(
      readFileSync('config/informations.json', {
        encoding: 'utf8',
        flag: 'r',
      })
    );
  }

  async login(token) {
    try {
      await this.client.login(token);
    } catch (e) {
      console.log(e.message);
    }
  }

  onReady() {
    this.client.on('ready', () => {
      clearInterval(interval);
      console.clear();
      askStatusMode();
    });
  }

  setStreamingMode() {
    console.log('Streaming mode activated.');

    this.client.user.setPresence({
      activities: [
        {
          name: this.config.streaming.name,
          type: 'STREAMING',
          url: this.config.streaming.url,
        },
      ],
    });
  }

  setListeningMode() {
    console.log('Listening mode activated.');

    this.client.user.setPresence({
      status: this.config.listening.status,
      activities: [
        {
          name: this.config.listening.name,
          type: 'LISTENING',
        },
      ],
    });
  }

  setWatchingMode() {
    console.log('Watching mode activated.');

    this.client.user.setPresence({
      status: this.config.watching.status,
      activities: [
        {
          name: this.config.watching.name,
          type: 'WATCHING',
        },
      ],
    });
  }

  setCompetingMode() {
    console.log('Competing mode activated.');

    this.client.user.setPresence({
      status: this.config.competing.status,
      activities: [
        {
          name: this.config.competing.name,
          type: 'COMPETING',
        },
      ],
    });
  }

  setPlayingMode() {
    console.log('Playing mode activated.');

    this.client.user.setPresence({
      status: this.config.playing.status,
      activities: [
        {
          name: this.config.playing.name,
          type: 'PLAYING',
        },
      ],
    });
  }

  setCustomMode() {
    console.log('Custom mode activated.');

    this.client.user.setPresence({
      activities: [new CustomStatus({ state: this.config.custom.name })],
      status: this.config.custom.status,
    });
  }
}
