// import the page-mod and self APIs
var pageMod = require('sdk/page-mod');
var self = require('sdk/self');

// @include
let matches = [
    'https://www.youtube.com*',
    'http://www.youtube.com*'
];
 
// create the page mod
pageMod.PageMod({
    include: matches,
    contentScriptFile: self.data.url('youtube-local-favorites.js')
});

