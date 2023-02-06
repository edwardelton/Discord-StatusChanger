'use strict';

const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let index = 0;

export const interval = setInterval(() => {
  process.stdout.write(dots[index++] + ' loading...\r');
  if (index === dots.length) index = 0;
}, 80);
