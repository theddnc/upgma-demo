import React from 'react';
import { defaultTableConfig } from '../config';
import Grid from './grid/Grid';
require('./App.css');

export default () => <Grid config={ defaultTableConfig } />;
