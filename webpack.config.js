module.exports = {
 entry: './App/Components/Application.tsx',
 output: {
   filename: './wwwroot/app.js',
   path: __dirname
 },
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     },
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
};