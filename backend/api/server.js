import Hapi from 'hapi';

const server = new Hapi.Server({
    host: '192.168.20.78',
    port: '3000',
    routes: {
        cors: {origin: 'ignore'},
    },
});


async function main() {
    await server.register([{
        plugin: require('./shifts-mock-api'),
        routes: {prefix: '/shifts'},
    }]);
    await server.start();
    console.info(`✅  API server is listening at ${server.info.uri.toLowerCase()}`);
}

main().then(r => {
    console.log(r)
});
