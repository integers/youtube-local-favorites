### YouTube Local Favorites

Note: this script requires at least Firefox 22. It does not work in any other 
browser (I do not use any browser-specific extensions, but none of the other 
browsers support the amount of ECMAScript 6 features that Firefox supports. 
When those browsers catch up, this script will work in them).

Note #2: For those of you who use the excellent usercript YouTube Center, you 
should know that my script disables SPF automatically, as my script was not 
written to take advantage of it. If you'd like to override this behavior, edit 
the script and remove the line with the following code: "ytspf.enabled = false"

YouTube Local Favorites lets you manage and store your favorites offline.

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

## Adding and removing favorites

To get started, simply go to any video page. Next to the "Like" button, you 
should see a new "Favorite" button, as well as a small arrow to the right of it 
(the "Favorites Menu" button).

To add the current video to your local favorites, simply click the "Favorite" 
button. To remove it, click it again.

## Exporting

If you'd like to view a list of all your local favorites, click the "Favorites 
Menu" button and click "HTML" or "Plain Text" under the "Export" header. This 
will open a new tab, giving you a neat listing of your local favorites, ordered 
with the newest videos first.

If you'd like to export all your local favorites to a file, click the 
"Favorites Menu" button and click "JSON" under the "Export" header. This will 
prompt you to save a file called "youtube-local-favorites.json" locally. This 
can be useful, for example, if you want to import it on another computer (see 
below).

## Importing

Now for the fun stuff. To import your local favorites, click the "Favorites 
Menu" button and click "JSON" under the "Import" header. I would advise not 
importing any JSON files that you, yourself, didn't export. For the technically 
inclined, this is because I do not perform any kind of sanitization on the JSON 
files you import - I simply load it into HTML5 localStorage directly. I 
understand that this is a massive security risk, but if you only import JSON 
files containing your favorites that you, yourself, exported, you have nothing 
to worry about.

You may also try the experimental YouTube import option. Click the "Favorites 
Menu" button and click "YouTube" under the "Import" header. This will attempt 
to copy all your existing YouTube favorites into your local favorites. The 
order of your favorites should be correct, but there's no guarantee that it'll 
import them in order. It also may not support importing more than 700 videos, 
due to the way the script is implemented. Deleted videos will not be imported, 
but videos that have been removed for copyright reasons might be imported. To 
remove those from your local favorites, remove them manually from YouTube's 
favorites and re-import.

## Removing all favorites

At the moment, I only support removing all your local favorites. Click the 
"Favorites Menu" button and click "Remove All" at the very bottom. This will 
prompt you, and if you agree, it will remove all local favorites.

To individually remove videos from your local favorites, simply visit the video 
itself and click the "Favorite" button to remove it.

