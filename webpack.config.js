const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Handlebars = require("handlebars");
const fs = require("fs");

module.exports = {
  devServer: {
    static: "./dist",
    open: true,
    port: 3000,
    watchFiles: ["src/**/*"],
  },
  entry: "./main.js",
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

            const configPath = path.join(__dirname, "src/config.json");
            const rawConfig = fs.readFileSync(configPath, "utf8");
            const config = JSON.parse(rawConfig);

            const componentsDir = path.join(__dirname, "src/components");

            fs.readdirSync(componentsDir).forEach((file) => {
              const fullPath = path.join(componentsDir, file);

              loaderContext.addDependency(fullPath);

              const componentContent = fs.readFileSync(fullPath, "utf8");
              const componentName = path.basename(file, path.extname(file));

              Handlebars.registerPartial(componentName, componentContent);
            });
            try {
              result = Handlebars.compile(content)(config);
            } catch (error) {
              loaderContext.emitError(error);

              return content;
            }

            return result;
          },
        },
      },
      {
        test: /\.scss$/i,
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
