module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // '@babel/preset-env',
    // ['@babel/preset-env', { targets: { esmodules: true } }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
