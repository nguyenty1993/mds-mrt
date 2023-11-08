const path = require('path');
const glob = require('glob');

function getFileNameFromPath(path: string): string {
  const splitted = path.split('/');
  return splitted[splitted.length - 1];
}
function getOutputFolder(path: string): string {
  return path.split('/')[3];
}

module.exports = {
  entry: {
    main: {
      import: './src/index.ts',
      filename: './index.js',
      library: {
        type: 'commonjs2',
      },
    },
    utils: {
      import: './src/utils/index.ts',
      filename: './utils/index.js',
      library: {
        type: 'commonjs2',
      },
    },
    icons: {
      import: './src/icons/index.tsx',
      filename: './icons/index.js',
      library: {
        type: 'commonjs2',
      },
    },
    icons2: {
      import: './src/icons2/index.tsx',
      filename: './icons2/index.js',
      library: {
        type: 'commonjs2',
      },
    },
    styled: {
      import: './src/styled/index.ts',
      filename: './styled/index.js',
      library: {
        type: 'commonjs2',
      },
    },
    atoms: {
      import: './src/components/atoms/index.ts',
      filename: './components/atoms/index.js',
      library: {
        type: 'commonjs2',
      },
    },
    molecules: {
      import: './src/components/molecules/index.ts',
      filename: './components/molecules/index.js',
      library: {
        type: 'commonjs2',
      },
    },
    organisms: {
      import: './src/components/organisms/index.ts',
      filename: './components/organisms/index.js',
      library: {
        type: 'commonjs2',
      },
    },
  },
  output: {
    library: {
      type: 'commonjs2',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx|\.ts?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, path.resolve(__dirname, 'src/micros')],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              memo: true,
              removeDimensions: true,
              icon: true,
              replaceAttrValues: { '#292D32': '{props.color ?? "#292D32"}' },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDom',
      root: 'ReactDom',
    },
  },
  experiments: {
    outputModule: true,
  },
  // optimization: {
  //   minimize: false,
  // },
};
