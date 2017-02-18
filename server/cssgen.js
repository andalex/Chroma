const fs = require('fs');
const namer = require('color-namer');


// css comments
const palComment = 
`
/*\n
* === CHROMA COLOR PALETTE : ) ===\n
*/\n\n
`

const defaultComment = 
`
/*\n
* — Defaults —\n
*/\n\n
`

const colorsComment = 
`
/*\n
* — Palette —\n
*/\n\n
`

const fontsComment = 
`
/*\n
* — Font colors —\n
*/\n\n
`

const backgroundsComment = 
`
/*\n
* — Background colors —\n
*/\n\n
`

const genCss = function(paletteObject, scss, sendCss) {

let colorNames = [];
let scssVars = [];
let colorClasses = [];
let fontColorClasses = [];
let cssData = '';
let noScss = '';
let fileType = scss ? 'palette.scss' : 'palette.css';

let colorClassNames = ['.primary-alpha', '.primary-beta', '.accent-alpha', '.accent-beta','.accent-gamma']

if(!scss) {
    colorClasses.push(palComment,
                      defaultComment,
                      `.primary-font{ color: ${paletteObject.fontColor};}\n\n`, 
                      `.primary-background { background-color: ${paletteObject.currentColor};}\n\n`,
                      colorsComment);

} else {
   scssVars.push(palComment,
                 defaultComment,
                 `$primaryFont: ${paletteObject.fontColor};\n\n`,
                 `$primaryBackground: ${paletteObject.currentColor};\n\n`,
                 `.primary-font {color: $primaryFont;} \n\n`, 
                 `.primary-background {background-color: $primaryBackground;}\n\n`, 
                 colorsComment);
}


for(var ii= 0; ii < paletteObject.palette.length; ii++) {

    colorNames.push(namer(paletteObject.palette[ii]).html[0].name);

    if(!scss) {
        colorClasses.push(`${colorClassNames[ii]}{ background-color: ${paletteObject.palette[ii]};}\n\n`);
        fontColorClasses.push(`${colorClassNames[ii]}-font { color: ${paletteObject.palette[ii]};}\n\n`);
    } else {
        scssVars.push(`$${colorNames[ii]}: ${paletteObject.palette[ii]};\n\n`);
        colorClasses.push(`${colorClassNames[ii]}{ background-color: $${colorNames[ii]};}\n\n`);
        fontColorClasses.push(`${colorClassNames[ii]}-font { color: $${colorNames[ii]};}\n\n`);
    }

}

if(!scss) {
    cssData = `${colorClasses.join('')}${fontColorClasses.join('')}`;
} else {
    cssData = `${scssVars.join('')}${colorClasses.join('')}${fontColorClasses.join('')}`;
}

try {
    fs.writeFileSync(`./server/models/${fileType}`, cssData);
} catch(err) {
    console.log(err);
}
sendCss();

}

module.exports = genCss;