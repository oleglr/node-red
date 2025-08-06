const express = require('express');
const http = require('http');
const RED = require('node-red');

const app = express();
const server = http.createServer(app);

const settings = {
    httpAdminRoot: '/red',
    httpNodeRoot: '/',
    userDir: './',
    functionGlobalContext: {}
};

let started = false;
async function init() {
    if (!started) {
        RED.init(server, settings);
        app.use(settings.httpAdminRoot, RED.httpAdmin);
        app.use(settings.httpNodeRoot, RED.httpNode);
        await RED.start();
        started = true;
    }
}

module.exports = async function(req, res) {
    await init();
    app(req, res);
};
