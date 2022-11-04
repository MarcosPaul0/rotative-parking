module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@theme': './src/theme',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@utils': './src/utils',
            '@enums': './src/enums',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@contexts': './src/contexts',
            '@styles': './src/styles',
          },
        },
      ],
    ],
  };
};
