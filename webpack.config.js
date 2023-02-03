const WAY = {
    INDEX: "./#src/js/pages/index.js",
    CATALOG: "./#src/js/pages/catalog.js"
}

const path = require("path");

module.exports = {
    entry: {
        index: WAY.INDEX,
        catalog: WAY.CATALOG
    },
    output: {
        path: path.resolve(__dirname, "js"),
        filename: "[name].bundle.js"
    },
    // devtool: "inline-source-map",
    mode: "production"
}
