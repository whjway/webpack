const loaderUtils = require("loader-utils");
const fs = require("fs");
const path = require("path");
const Spritesmith = require("spritesmith");

module.exports = function (source) {
  const callback = this.async();

  const imgs = source.match(/url\((\S*)\?__sprite/g);
  const matchedImgs = [];
  console.log(imgs);

  for (const _img of imgs) {
    const img = _img.match(/url\((\S*)\?__sprite/)[1];
    matchedImgs.push(path.join(__dirname, img));
  }

  console.log(matchedImgs);

  Spritesmith.run({ src: matchedImgs }, function handleResult(err, result) {
    fs.writeFileSync(path.join(process.cwd(), "dist/sprite.png"), result.image);
    source = source.replace(/url\((\S*)\?__sprite/g, (match) => {
      return `url("dist/sprite.jpg"`;
    });

    fs.writeFileSync(path.join(process.cwd(), "dist/index.css"), source);
    callback(null, source);
  });
};
