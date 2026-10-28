// Compare the overview canvas against the bundled offline reference at equal viewport/data.
const fs = require('fs');
const path = require('path');
const {pathToFileURL} = require('url');
const {chromium} = require('playwright');
const sharp = require('sharp'); // Installed with Next.js image support.
async function main() {
  const executablePath = process.env.BROWSER_EXECUTABLE || ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
  const browser = await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
  try {
    const buffers=[];
    const sources=[pathToFileURL(path.resolve(__dirname,'../reference/html-preview/design-system.html')).href,process.env.KIT_URL||'http://127.0.0.1:4185'];
    for(let i=0;i<sources.length;i++) {
      const context=await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:1});
      const page=await context.newPage();
      await page.goto(sources[i]);
      await page.locator('.recharts-area').first().waitFor();
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(400);
      buffers.push(await page.locator('.kit-canvas').screenshot({path:path.resolve(__dirname,`../verification/visual-${i?'nextjs':'html'}.png`)}));
      await context.close();
    }
    const images=await Promise.all(buffers.map(b=>sharp(b).ensureAlpha().raw().toBuffer({resolveWithObject:true})));
    const dimensionsMatch=images[0].info.width===images[1].info.width&&images[0].info.height===images[1].info.height;
    let changedPixels=0,maxDifference=0;
    if(dimensionsMatch) for(let i=0;i<images[0].data.length;i+=4) {
      let changed=false;
      for(let c=0;c<4;c++){const difference=Math.abs(images[0].data[i+c]-images[1].data[i+c]);maxDifference=Math.max(maxDifference,difference);if(difference)changed=true;}
      if(changed)changedPixels++;
    }
    const report={viewport:{width:1920,height:1080},scope:'Overview content canvas only, light theme, fixed matching data',dimensionsMatch,width:images[0].info.width,height:images[0].info.height,changedPixels:dimensionsMatch?changedPixels:null,maxChannelDifference:dimensionsMatch?maxDifference:null,changedPixelPercent:dimensionsMatch?100*changedPixels/(images[0].info.width*images[0].info.height):null};
    fs.writeFileSync(path.resolve(__dirname,'../verification/visual-comparison.json'),JSON.stringify(report,null,2));
    console.log(report);
    if(!dimensionsMatch)process.exitCode=1;
  } finally {await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
