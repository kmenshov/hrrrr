require('@babel/polyfill');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// eslint-disable-next-line no-underscore-dangle
global.__createServer = require('../server');

enzyme.configure({ adapter: new Adapter() });
