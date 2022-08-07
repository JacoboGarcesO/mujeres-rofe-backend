import express from 'express';
import Loader from './core/loaders/index';

(
  async () => {
    const loader = new Loader(express());
    await loader.load();
  }
)();
