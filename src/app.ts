import chalk from 'chalk';

import server from './server';

const log = console.log;

const port = server.get('port');

server.listen(port, ()=>
  log( chalk.magenta(`Server is running on port ${port}`)),
);
