import server from './server';

server.listen(server.get('port'), ()=> console.log('Server is running'));
