import chalk from 'chalk';

import server from './server';

// TOOD: Replace the regular console.log in favor of Winston
const log = console.log;

const port = server.get('port');

server.listen(port, ()=>
  log( chalk.magenta(`Server is running on port ${port}`)),
);
