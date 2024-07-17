require("dotenv").config();

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Handlebars = require("handlebars");
const fs = require("fs");

const locale = process.env.LOCALE;

module.exports = {
  devServer: {
    static: "./dist",
    open: true,
    port: 3000,
    watchFiles: ["src/**/*"],
  },
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.hbs$/i,
        loader: "html-loader",
        options: {
          preprocessor: (content, loaderContext) => {
            let result;

            function registerRecursively(dir) {
              fs.readdirSync(dir).forEach((file) => {
                const fullPath = path.join(dir, file);

                if (fs.statSync(fullPath).isDirectory()) {
                  return registerRecursively(fullPath);
                }

                if (path.extname(file) !== ".hbs") {
                  return;
                }

                loaderContext.addDependency(fullPath);

                const componentContent = fs.readFileSync(fullPath, "utf8");
                const componentName = path.basename(file, path.extname(file));

                Handlebars.registerPartial(componentName, componentContent);
              });
            }

            const componentsDir = path.join(__dirname, "src/components");
            registerRecursively(componentsDir);

            const translationsPath = path.resolve(
              __dirname,
              "src",
              "locales",
              locale + ".json"
            );

            const translations = JSON.parse(
              fs.readFileSync(translationsPath, "utf8")
            );

            try {
              result = Handlebars.compile(content)({ ...translations });
            } catch (error) {
              loaderContext.emitError(error);

              return content;
            }

            return result;
          },
        },
      },
      {
        test: /\.(scss|css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.hbs",
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
