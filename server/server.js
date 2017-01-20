const app    = require('./app');
const http   = require('http');
const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log(`server listening on port: 3000`);
});
server.on('error', (e) => {
    if (e.code == 'EADDRINUSE') {
        console.log('Port in use, trying another..');
        setTimeout(() => {
            app.close();
            app.listen(3000, 'localhost');
        }, 8000);
    }
});
