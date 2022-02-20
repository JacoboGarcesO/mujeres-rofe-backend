import express from 'express';
import loader from './loaders/index';

const init = () => {
  const app = express();
  loader(app);
};

init();
