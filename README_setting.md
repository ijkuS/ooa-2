# Setting Up a React and TypeScript Environment Without Create-React-App (CRA)

In the past, Create-React-App (CRA) was the go-to solution for setting up React applications. However, its usage has declined, and as of April 2022, it is no longer actively maintained.

While CRA was once a part of the official React documentation, the latest guidelines now recommend using frameworks like Next.js or other alternatives for React development.

This repository serves as a hands-on exercise in configuring React and TypeScript from scratch, without relying on frameworks. It aims to deepen understanding of the essential libraries, files, and settings required to build a React application.

## Table of contents

-    [Process](#process)

     -    [1. Create package.json](#1-create-packagejson)
     -    [2. Install libraries](#2-install-libraries)

          -    [React](#react)
          -    [Loader](#loader-for-babel)
          -    [Bundler](#bundler-for-webpack)
          -    [Formatter: prettier, eslint](#formatter-prettier-eslint)

     -    [3. Create required setting for libraries](#3-create-required-setting-and-files-for-libraries)

          -    [for Babel](#for-babel)
          -    [for prettier](#for-prettier)
          -    [for eslint](#for-eslint)
          -    [for dotenv](#for-dotenv)
          -    [for webpack](#for-webpack)
          -    [for command](#for-command)

     -    [4. Create basic files](#4-create-basic-files)
     -    [5. Set up for git](#5-set-up-for-git)
     -    [6. Check and test](#6-check-and-test)

-    [Challenges and Lessons](#challenges-and-lessons)
     -    [Difference between Type checker and Eslint](#difference-between-type-checker-and-eslint)

## Process

### 1. Create package.json

`init -y`: create package.json with default setting

```shell
   npm init -y
```

### 2. Install libraries

#### React

```shell
   npm i react react-dom
```

#### TypeScript

```shell
   npm i -D typescript @types/react @types/react-dom
```

#### Loader for Babel

```shell
   npm i -D  babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

#### Bundler for Webpack

```shell
   npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader mini-css-extract-plugin file-loader dotenv-cli fork-ts-checker-webpack-plugin
```

-    webpack: A module bundler for JavaScript applications.
-    webpack-cli: Provides various commands to make using webpack easier.
-    webpack-dev-server: A development web server.
-    html-webpack-plugin: Loads the bundled JavaScript into an HTML file after bundling.
-    css-loader: A loader used to import CSS files in JavaScript, allowing webpack to process CSS.
-    mini-css-extract-plugin (can also use style-loader): Creates separate CSS files and loads them into HTML.
-    style-loader inserts CSS code into the HTML style tags.
-    file-loader: A loader for handling file imports in JavaScript.
-    dotenv-cli: A plugin for managing environment variables.
-    fork-ts-checker-webpack-plugin: A webpack plugin that checks TypeScript types in a separate process

#### Formatter: prettier, eslint

```shell
   npm i -D prettier eslint@8 eslint-plugin-react-refresh eslint-plugin-jsx-a11y eslint-plugin-react-hooks  @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

-    prettier: Used for code formatting to ensure consistent code style.
-    eslint: Used for code formatting and improving code quality (version 8 is installed to ensure compatibility with the plugins below).
     -    eslint-plugin-react: The default ESLint plugin for React.
     -    eslint-plugin-react-hooks: Used for formatting React hooks code.
     -    eslint-plugin-react-refresh: Automatically updates React components when code changes.
     -    eslint-plugin-jsx-a11y: A plugin that helps developers address accessibility issues that are easy to overlook.
     -    @typescript-eslint/eslint-plugin: Used to enhance TypeScript coding style and code quality.
     -    @typescript-eslint/parser: A parser that enables ESLint to understand TypeScript code.

The ESLint plugins reference the settings used in a Vite-React-TS setup. It's recommended to configure ESLint rules according to your specific environment.

### 3. Create required setting and files for libraries

#### for TypeScript

**`tsconfig.json`**
Avoid using tsc --init to configure your project. Instead, **create a tsconfig.json file manually** and use the configuration provided below. Running tsc --init may introduce conflicts and disrupt file connections.

```json
{
	"compilerOptions": {
		"target": "es6",
		"useDefineForClassFields": true,
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"skipLibCheck": true,
		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx",
		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true
	},
	"include": ["src"]
}
```

#### for Babel

**`babel.config.json`**
Since Babel does not handle this automatically, you need to specify `{ "runtime": "automatic" }` in your configuration. Although React 17 introduced the JSX Transform, which eliminates the need to include import React from 'react' in every React file, this setting is required to enable Babel to support the transformation correctly.

```json
{
	"presets": [
		[
			"@babel/preset-react",
			{
				"runtime": "automatic"
			}
		],
		"@babel/preset-env",
		"@babel/preset-typescript"
	]
}
```

#### for prettier

**`.prettierrc`**

```json
{
	"printWidth": 140,
	"tabWidth": 2,
	"useTabs": false,
	"semi": true,
	"arrowParens": "always",
	"singleQuote": true,
	"trailingComma": "es5",
	"bracketSameLine": false,
	"bracketSpacing": false
}
```

#### for eslint

**`.eslintrc.cjs`**

```cjs
module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'jsx-ally'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
};
```

#### for dotenv

Create .env (for local development) and .env.production (for production) files in the root directory of the project.

The specified variables cannot be used directly in React. To use them within the build, additional Webpack configuration is required (refer to the Webpack configuration).

`.env`

```
   MODE=development
   PORT=3000
```

`.env.production`

```
   MODE=production
   PORT=3000
```

#### for webpack

`webpack.config.js`

```javascript
// webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = {
	mode: process.env.MODE,
	entry: './src/index.tsx',
	resolve: {
		// Specifies the files to be bundled.
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		// Loader configuration
		// – applied to the bundle starting from the last loader in the array.
		// Exclude node_modules.
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				use: ['babel-loader'],
				exclude: '/node_modules/',
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: 'assets/[contenthash].[ext]',
				},
			},
		],
	},
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.[hash].js',
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		// Adds the bundled CSS and JS files to the HTML file
		// via link and script tags.
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		// Provides environment variables.
		new webpack.EnvironmentPlugin(['MODE', 'PORT']),
	],
	devServer: {
		host: 'localhost',
		port: process.env.PORT,
		open: true,
		historyApiFallback: true,
		hot: true,
		// hot: Automatically reflects only the changed parts of the module on the server.
	},
	devtool: 'eval-cheap-source-map',
};
```

#### for command

Add below contents in `package.json` to make command

```json
"scripts": {
    "start": "dotenv -e .env webpack-dev-server --progress",
    "build": "dotenv -e .env.production webpack --progress"
  },
```

### 4. Create basic files

#### public/index.html

```html
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8" />
		<meta
			content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
			name="viewport" />
		<meta content="ie=edge" http-equiv="X-UA-Compatible" />
		<title>React-Ts-Webpack</title>
	</head>
	<body>
		<div id="root"></div>
	</body>
</html>
```

#### src/index.tsx

```tsx
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
```

#### src/App.tsx

```tsx
function App() {
	return <div>Hello World!</div>;
}

export default App;
```

### 5. Set up for git

#### .gitignore

```
   node_modules/


   .env
   .env.production
   .eslintrc.cjs
   .prettierrc
```

### 6. Check and test

Check if the application works with customized commands which I created

```shell
   npm run start
```

```shell
   npm run build
```

## Challenges and Lessons

### Difference between Type checker and Eslint

-    Fork TS Checker Webpack Plugin
     This is a webpack plugin that checks TypeScript types in a separate process.

-    Why It Was Created
     When webpack encounters TypeScript files, it first requires a loader to parse those files. Previously, we would combine awesome-typescript-loader with CheckerPlugin (which checks types in a separate process) to handle both TypeScript compilation and type checking simultaneously. However, the issue was that awesome-typescript-loader was significantly slower in incremental builds compared to ts-loader.

As a result, we switched to ts-loader and developed this fork-ts-checker-webpack-plugin to add type checking functionality to ts-loader. To improve performance, this plugin shares the compiled AST (Abstract Syntax Trees) with tslint.

-    What is AST?
     AST stands for Abstract Syntax Tree, which is a tree structure representing the parsed TypeScript code during compilation.

-    Why Use a Type Checker When ESLint Exists?
     While both ESLint and the type checker share the goal of catching errors during compile-time before code execution, they serve different purposes:

     -    ESLint corrects syntactical issues in the code.
     -    The type checker ensures that functions, classes, and other elements are correctly written according to the specified types.

You can use both ESLint and the type checker together, or choose to use only one. However, ESLint is typically considered essential in most cases.
