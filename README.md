# YouTube Local Favorites

**Current Version/Last Updated**: 2017-01-07 ([Changelog](https://github.com/integers/youtube-local-favorites/blob/master/CHANGELOG.md))

**YouTube Local Favorites** lets you manage and store your favorites offline.

The backstory behind the creation of this script: a friend of mine deleted his 
YouTube account, having grown a dislike of the general direction that the 
website was going, particularly in regard to mandatory Google+ integration in 
order to post comments. Suffice to say, due to its continued widespread use, he 
still uses the website and watches videos, but he found himself missing the 
"favorites" feature greatly. He tried simply copy/pasting video URL's and 
titles into a text file, but he found that too much of a hassle. He tried 
bookmarking videos he liked, but that bloated his bookmark folders and was 
somewhat clunky. Eventually he came to me and explained the situation, and I 
found it a fantastic opportunity for automation. And so, "YouTube Local 
Favorites" was born!

## Download

UserScript: [youtube-local-favorites.user.js](https://github.com/integers/youtube-local-favorites/raw/master/src/youtube-local-favorites.user.js)

**Note**: this script requires a modern browser that supports the latest
[ECMAScript 6 features](https://kangax.github.io/compat-table/es6/).
I develop the script using Firefox, but it should work in any modern browser,
as it does not use any browser-specific extensions.

## Screenshots

| ![YouTube Local Favorites Main Interface](https://raw.githubusercontent.com/integers/youtube-local-favorites/master/screenshots/youtube-local-favorites-2014-09-25-main-interface.png "YouTube Local Favorites Main Interface") | ![YouTube Local Favorites HTML Export Interface](https://raw.githubusercontent.com/integers/youtube-local-favorites/master/screenshots/youtube-local-favorites-2014-02-26r2-html-export-interface.png "YouTube Local Favorites HTML Export Interface")
|:----:|:----:|

## Usage

### Adding and removing favorites

To get started, simply go to any video page. Just to the left of the "Add to"
button, you should see a new "Favorite" button with a heart icon, as well as a
small arrow to the right of it (the "Favorites Menu" button).

To add the current video to your local favorites, simply click the "Favorite" 
button. To remove it, click it again.

### Exporting

If you'd like to view a list of all your local favorites, click the "Favorites 
Menu" button and click "HTML" or "Plain Text" under the "Export" header. This 
will open a new tab, giving you a neat listing of your local favorites, ordered 
with the newest videos first.

If you'd like to export all your local favorites to a file, click the 
"Favorites Menu" button and click "JSON" under the "Export" header. This will 
prompt you to save a file called "youtube-local-favorites.json" locally. This 
can be useful, for example, if you want to import it on another computer (see 
below).

### Importing

Now for the fun stuff. To import your local favorites, click the "Favorites 
Menu" button and click "JSON" under the "Import" header. **I would advise not 
importing any JSON files that you, yourself, didn't export.** For the
technically inclined, this is because I do not perform any kind of sanitization
on the JSON files you import - I simply load it into HTML5 localStorage
directly. I understand that this is a massive security risk, but if you only
import JSON files containing your favorites that you, yourself, exported, you
have nothing to worry about.

YouTube Local Favorites formerly supported an experimental feature that allowed
you to copy all your existing YouTube favorites into your local favorites. It
was prone to break very easily because it relied on many YouTube features that
are out of my control. And, suffice to say, it did finally break when YouTube
got rid of the
[traditional favorites page](https://www.youtube.com/my_favorites) and
converted it to a playlist. I may attempt to fix the feature in a future
version, but for now the option has been removed from the Favorites Menu.

### Removing all favorites

To remove all your local favorites, click the "Favorites Menu" button and click
"Remove All" at the very bottom. This will prompt you, and if you agree, it
will remove all local favorites.

To individually remove videos from your local favorites, simply visit the video 
itself and click the "Favorite" button to remove it.

