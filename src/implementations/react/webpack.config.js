const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const pkg = JSON.parse(fs.readFileSync('./package.json'));

var r = {
  entry: './src/react-hig.js',
  output: {
    path: path.resolve('./lib'),
    filename: 'react-hig.js',
    library: 'HigReact',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [/src/],
        exclude: [/node_modules/, /..\/vanilla/],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            compact: true
          }
        }
      }
    ]
  },
  plugins:[]
}



// r['plugins'].push(new webpack.DefinePlugin({
//   'process.env': {
//     'NODE_ENV': JSON.stringify('production')
//   }
// }));

if(process.env.NODE_ENV == "production"){
  console.log("PRODUCTION BUILD");

  var d = new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  });

  var p = new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    mangle: {
      debug: "test--"
    },
    beautify: true,
    compress: {
      properties: false,
      warnings: false,
      unused: true,
      dead_code: true,
      drop_console: true,
    },
    output: {
      comments: true,
    }
  });

  r['plugins'].push(d);
  r['plugins'].push(p);
  r['plugins'].push(new webpack.optimize.ModuleConcatenationPlugin());

}else{
  r['devtool'] = 'inline-source-map';
  
}

module.exports = r;