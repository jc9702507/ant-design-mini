const path = require('path');
const { fork } = require("child_process");
const { minidev } = require('minidev');
const fs= require('fs');
const getSourceCode = require('./getSourceCode');


async function buildMiniProgram() {
  const cache = path.join(__dirname, '../.cache');
  if (fs.existsSync(cache)) {
    fs.rmdirSync(cache, {
      recursive: true,
    }); 
  }
  await minidev.build({
    project: path.join(__dirname, '../'),
    output: path.join(__dirname, '../dist'),
    enableLess: true,
    enableTypescript: true,
    cacheDir: cache,
  });
}

function buildDocs() {
  return new Promise((resolve, reject) => {
    const child = fork(`${process.cwd()}/node_modules/dumi/bin/dumi.js`, ['build'], {
      env: {
        NODE_OPTIONS: '--openssl-legacy-provider',
        FORCE_COLOR: 1,
      },
    });
    child.on('close', (code) => {
      if (code !== 0) {
        reject();
      }
      resolve();
    });
    process.on('exit', () => {
      child.kill();
    });
  })
}



async function buildPreview(theme = 'default') {
  const list = ['appConfig.json', 'index.html', 'index.js', 'index.worker.js'];
  const dist = {};
  list.forEach(item => {
    const content = fs.readFileSync(path.join(__dirname, theme === 'dark' ? '../dist-theme-dark/ng-main' : '../dist/ng-main', item), 'utf-8');
    dist[item] = content;
  });

  const appConfig = require(path.join(__dirname, '../demo/app.json'));
  const pages = appConfig.pages;
  const sourceCode = {};
  const arr = await Promise.all(pages.map(item => getSourceCode(item)));
  arr.forEach(item => {
    Object.assign(sourceCode, item);
  });
  const iframeContent = fs.readFileSync(path.join(__dirname, '../.dumi/theme/builtins/iframe.html'), 'utf-8');
  fs.writeFileSync(path.join(__dirname, `../docs-dist/preview${theme === 'dark' ? '-theme-dark' : ''}.json`), JSON.stringify({
    dist,
    sourceCode,
  }));
  if (theme === 'dark') {
    return;
  }
  fs.writeFileSync(path.join(__dirname, '../docs-dist/preview.html'), iframeContent);
  fs.mkdirSync(path.join(__dirname, '../docs-dist/mini'));
  const packageInfo = {};
  fs.writeFileSync(path.join(__dirname, '../docs-dist/mini/packageInfo.json'), JSON.stringify(packageInfo));
}


(async () => {
  try {
    // await compile();
    await Promise.all([
      buildMiniProgram(),
      buildDocs(),
    ]);
    await Promise.all([
      buildPreview(),
      // buildPreview('dark'),
    ]);
    console.log('build success!');
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
})();
