const path = require('path')  //ya esta disponible en node, no es necesario instalar dependencias
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//el modulo tendtra un objeto
module.exports = {
    entry: './src/index.js',//punto de entrada de nuestra app
    output: { //hacia donde vamos a enviar
        path: path.resolve(__dirname, 'dist'), //cuando subimos nuestro  proyecto a la nube, no tendremos problemas al ubicar el archivo principal
        filename: 'main.js'
    },
    //extensiones con lo que vamos a trabajar
    resolve: {
        extensions: ['.js']
    },
    //para trabajar con babel-loader
    module:{
        rules: [ //reglas
            {
                test: /\.m?js$/, //extensiones con la que voy a trabajar
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ],
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inyect: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
    ]
}