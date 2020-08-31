import chalk from 'chalk';

import server from './server';

const port = server.get('port');

server.listen(port, ()=>
  chalk.bgWhite(`Server is running on port ${port}`),
);
