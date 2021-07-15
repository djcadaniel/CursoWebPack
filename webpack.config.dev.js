const path = require('path')  //ya esta disponible en node, no es necesario instalar dependencias
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

//el modulo tendtra un objeto
module.exports = {
    entry: './src/index.js',//punto de entrada de nuestra app
    output: { //hacia donde vamos a enviar
        path: path.resolve(__dirname, 'dist'), //cuando subimos nuestro  proyecto a la nube, no tendremos problemas al ubicar el archivo principal
        filename: '[name].[contenthash].js',//para que me muestre cual fue el has de este build
        assetModuleFilename: 'assets/images/[hash][ext][query]' //moviendo nuestras imagenes a dist
    },
    mode: 'development',
    devtool: 'source-map',//se generara un json
    // watch:true,
    //extensiones con lo que vamos a trabajar
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),//ahi es donde se encuentranuestro utils
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
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
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "aplication/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inyect: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),//hacia donde vamos a copiar
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(), //configuracion de variables de entorno
        new BundleAnalyzerPlugin(),
    ],
    //para tener un servidor local
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true, //tener un historial
        port: 3006,
        open: true //abrir el navegador automaticamente
    }
}