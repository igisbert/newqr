import { styleText } from 'node:util';

export const theme = {
  prefix: {
    idle: styleText('blue', '?'),
    done: styleText('green', '✅'),
  }
};