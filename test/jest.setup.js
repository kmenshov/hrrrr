/* eslint-disable no-underscore-dangle */
require('@babel/polyfill');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const createServer = require('../server');

global.__initServer = async () => { global.server = await createServer(); };

enzyme.configure({ adapter: new Adapter() });
