import path from 'path';

const BUILD_PATH = path.resolve(__dirname, 'public');
const APP_DIR = `${path.resolve(__dirname)}/client`;

export default {
  entry: `${APP_DIR}/index.js`,
  devtool: 'cheap-eval-source-map',
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'client'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      }
    ],
  },
};
