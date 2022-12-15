module.exports = {
  babel: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-transform-typescript'],
  },

  webpack: {
    configure: {
      module: {
        rules: [
          // JavaScript: Use Babel to transpile JavaScript files for js or jsx
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: { presets: ['@babel/env', '@babel/preset-react'] },
          },

          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules|\.d\.ts$/,
          },
          {
            test: /\.d\.ts$/,
            loader: 'ignore-loader',
          },

          // Images: Copy image files to build folder
          { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

          // Fonts and SVGs: Inline files
          { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

          // GLB or GLTF Models
          {
            test: /\.(glb|gltf|bin)$/,
            type: 'asset/resource',
          },
        ],
      },
    },
  },
};
