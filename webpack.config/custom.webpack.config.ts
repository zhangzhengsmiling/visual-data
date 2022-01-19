import { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs';

const dirs = fs.readdirSync(path.resolve(process.cwd(), 'src/packages'));
const entry = dirs.reduce((temp, dir) => {
  return {
    ...temp,
    [dir]: path.resolve(process.cwd(), `src/packages/${dir}/index.tsx`),
  };
}, {});

const configuration = (webpackConfig: Configuration) => {
  return {
    ...webpackConfig,
    // entry,
    // // plugins: webpackConfig.plugins?.filter((item) => !(item instanceof HtmlWebpackPlugin)),
    // output: {
    //   path: path.resolve(process.cwd(), 'es'),
    //   filename: '[name]/index.js',
    // },
  };
};

export default configuration;
