# Changelog

## 2017-06-01 [Current Version]

Major update that includes fixes for several long-standing bugs and some
enhancements.

* YLF is now run through [ESLint](http://eslint.org/). Specifically, I use
[Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript) as a
base and make a few exceptions for stylistic/practical reasons. This ensures
that I use the latest best practices for the script. Noteworthy rules that were
used to streamline the script include:
    * [no-unused-vars](http://eslint.org/docs/rules/no-unused-vars)
    * [prefer-const](http://eslint.org/docs/rules/prefer-const)
    * [no-param-reassign](http://eslint.org/docs/rules/no-param-reassign)
    * [no-trailing-spaces](http://eslint.org/docs/rules/no-trailing-spaces)
    * [padded-blocks](http://eslint.org/docs/rules/padded-blocks)
    * [space-infix-ops](http://eslint.org/docs/rules/space-infix-ops)
    * [camelcase](http://eslint.org/docs/rules/camelcase)
    * [prefer-template](http://eslint.org/docs/rules/prefer-template)
    * [spaced-comment](http://eslint.org/docs/rules/spaced-comment)
    * [no-useless-escape](http://eslint.org/docs/rules/no-useless-escape)\
    * [semi](http://eslint.org/docs/rules/semi)
* [SPF (Structured Page Fragments)](https://youtube.github.io/spfjs/) support!
This allows the favorite buttons to be loaded dynamically when clicking videos,
without having to refresh the page. In order to support it, the adding of the
favorite buttons to the DOM were isolated into a function, and the function is
called at the end of the script for the initial page load, and then called
every time the "spfdone" page event is fired (when a new page is dynamically
loaded). It's still highly experimental, but it seems to work without any
issues
* Fix HTML export option when using the [EasyList](https://easylist.to/) filter
lists in ad blockers. The HTML export option originally used a
[data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) to display its
contents, which is blocked by EasyList due to malicious websites abusing the
feature to display pop-ups. YLF now opens a blank page and inserts the HTML
directly
* Replaced PNG with SVG for heart icons, optimized via
[SVGO](https://github.com/svg/svgo) and the script in
[this CodePen post](https://codepen.io/tigt/post/optimizing-svgs-in-data-uris)
* Made the favorite buttons more similar in style to the other YouTube buttons
* Removed ```@include``` rule for non-https YouTube and modified rule for https
YouTube
* Removed ```nodeListToArray()``` function, since it's effectively a wrapper
for ```Array.from()```
* Added note about the use of an
[IIFE (Immediately-Invoked Function Expression)](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
* Re-arranged order of options in the Favorites Menu: the "Import" button &
options are now under the "Export" button and options, and the "Export" options
present HTML first, then Plain Text, and finally JSON

## 2017-01-07

Another small bugfix release.

* Updated ```String.prototype.replace()``` method to conform with new syntax
(see [Firefox Bug 1108382](https://bugzilla.mozilla.org/show_bug.cgi?id=1108382))
* Added minor sanitizing when importing from a JSON file (fixes a display bug
when exporting to HTML and Plain Text)
* Updated copyright notice with the current year

## 2016-01-15

Small bugfix release. In addition, the Firefox extension has been removed from
the repository entirely. I could update it and submit the extension to AMO
for signing, but with the announcement of
[WebExtensions](https://blog.mozilla.org/addons/2015/08/21/the-future-of-developing-firefox-add-ons/),
I think it'd be better to simply rewrite it in the future once the API has
stabilized. Until then, only the userscript will be supported.

* Removed deprecated array comprehension
(see [Firefox Bug 1220564](https://bugzilla.mozilla.org/show_bug.cgi?id=1220564)) and
replaced it with the ```Array.from()``` method
* Removed Firefox extension
* Updated copyright notice with the current year

## 2014-09-25

YLF can now be installed as a Firefox extension! You can install it
[here](https://github.com/integers/youtube-local-favorites/raw/master/src/firefox-extension/youtube-local-favorites.xpi).

In order to port it, a few minor bugs had to be fixed that I hadn't spotted
before. These include:

* Commented out line that disabled SPF, because it doesn't seem to be working
on YouTube and it just breaks the script
* Updated the insertion selector to be more precise

## 2014-09-24

Updated YLF to be compatible with the latest YouTube layout design. Changes
include:

* Changed copyright notice to include GitHub username (RIP userscripts.org)
* Added a small heart icon (in the public domain, found
[here](http://thenounproject.com/term/heart/219/)) next to the Favorite Button
* Changed the ```z-index``` on the banner to be the maximum value possible
* Added new classes to the Favorite Button to make it look similar to the other
buttons
* Removed a class from the Favorites Menu Button to make the tooltip appear on
the top rather than the bottom
* Removed the extra margins on the Favorite and Favorites Menu buttons to align
them properly
* Removed the ```transform``` attribute on the fixed header to make sure it's
at the top of the z-axis, uncovered by the video player
* Removed the YouTube import option from the Favorites Menu, as the feature
stopped working when YouTube got rid of the traditional favorites page and
converted it to a playlist
* Updated the selector that's used to actually insert the Favorite and
Favorites Menu buttons into the DOM

## 2014-02-26r2

Small bugfix release. The only change:

* Removed the @match UserScript option

## 2014-02-26

* Initial release

