module.exports = {
  root: true,
  ignorePatterns: ['dist', 'node_modules', 'coverage'],
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  overrides: [
    {
      // Build/config files run in Node.
      files: ['vite.config.js', 'tailwind.config.js', 'postcss.config.js', '*.cjs'],
      env: { node: true },
    },
  ],
}
