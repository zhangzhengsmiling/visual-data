const loader = {
  test: /\.(woff|woff2|eot|ttf|svg)$/,
  use: ['url-loader?limit=100000'],
};

export default loader;
