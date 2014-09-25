# Changelog

## 2014-09-25 [Current Version]

YLF now has a Firefox extension! You can install it
[here](https://github.com/integers/youtube-local-favorites/raw/master/src/firefox-extension/youtube-local-favorites.xpi).

In order to port it, a few minor bugs had to be fixed that I hadn't spotted
before. These include:

* Commented out line that disabled SPF, because it doesn't seem to be working
on YouTube and it just breaks the script
* Updated the insertion selector to be more precise

## 2014-09-24

Updated script to be compatible with the latest YouTube layout design. Changes
include:

* Changed copyright notice to include GitHub username (RIP userscripts.org)
* Added a small heart icon (in the public domain, found
[here](http://thenounproject.com/term/heart/219/)) next to the Favorite Button
* Changed the z-index on the banner to be the maximum value possible
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

