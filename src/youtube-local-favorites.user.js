// ==UserScript==
// @name          YouTube Local Favorites
// @description   Adds a local favorites option.
// @version       2017.06.07
// @include       https://www.youtube.com/*
// @grant         none
// ==/UserScript==

/*
 * Copyright (C) 2014-2017 integers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

// use an IIFE (Immediately-Invoked Function Expression) to prevent the use of
// global variables
(function() {
'use strict';

/*
 #################
 ### Functions ###
 #################
 */

/**
 * Grabs a fresh copy of your local favorites.
 *
 * @return an object that holds your local favorites in id:title pairs
 * type    getFavorites :: Void -> {_:_}
 */
const getFavorites = () => {
    // grab current favorites if they exist
    let favorites = JSON.parse(localStorage.getItem('ytfavorites'));

    // if they don't exist, convert "null" value into an empty object {}
    if (favorites === null) {
        favorites = {};
    }

    return favorites;
};

/**
 * Grabs a fresh copy of the video id and title.
 *
 * @return an array that holds the video id and title
 * type    getVideoData :: Void -> [a,b]
 */
const getVideoData = () => {
    // grab the video id
    const id = /v=([a-zA-Z0-9_-]+)/.exec(window.location.href)[1];

    // grab the video title
    const title = document.querySelector('#eow-title').title;

    return [id, title];
};

/**
 * Updates the properties of the favorite button based on whether the
 * current video is in your favorites or not.
 *
 * type updateFavoriteButton :: DOM Node -> DOM Node -> DOM Node -> Void
 */
const updateFavoriteButton = (
    favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
) => {
    // grab a fresh copy of your local favorites and the video data
    const favorites = getFavorites();
    const id = getVideoData()[0];

    // change the favorite button action, heart icon, text color and tooltip
    if (favorites[id]) {
        favoriteButton.removeEventListener('click', addFavorite);
        favoriteButton.addEventListener('click', removeFavorite);
        favoriteButton.button = favoriteButton;
        favoriteButton.icon = favoriteButtonHeartIcon;
        favoriteButton.text = favoriteButtonText;
        favoriteButton.classList.add('yt-uix-button-toggled');
        favoriteButton.setAttribute(
            'data-tooltip-text',
            'Remove from local favorites'
        );
        favoriteButtonHeartIcon.src = "data:image/svg+xml,%3Csvg xmlns='http" +
        "://www.w3.org/2000/svg' version='1' viewBox='0 0 19 17.788556' widt" +
        "h='19' height='17.789' fill='%231b7fcc'%3E%3Cpath d='M18.975 4.437A" +
        "4.944 4.944 0 0 0 9.5 3.028 4.944 4.944 0 0 0 0 4.942c0 6.007 7.37 " +
        "8.84 9.5 12.847 2.13-4.006 9.5-6.84 9.5-12.845 0-.171-.008-.34-.025" +
        "-.506z'/%3E%3C/svg%3E";
        favoriteButtonText.style.color = '#167ac6';
    } else {
        favoriteButton.removeEventListener('click', removeFavorite);
        favoriteButton.addEventListener('click', addFavorite);
        favoriteButton.button = favoriteButton;
        favoriteButton.icon = favoriteButtonHeartIcon;
        favoriteButton.text = favoriteButtonText;
        favoriteButton.classList.remove('yt-uix-button-toggled');
        favoriteButton.setAttribute(
            'data-tooltip-text',
            'Add to local favorites'
        );
        favoriteButtonHeartIcon.src = "data:image/svg+xml,%3Csvg xmlns='http" +
        "://www.w3.org/2000/svg' version='1' viewBox='0 0 19 17.788556' widt" +
        "h='19' height='17.789' fill='%23000'%3E%3Cpath d='M18.975 4.437A4.9" +
        "44 4.944 0 0 0 9.5 3.028 4.944 4.944 0 0 0 0 4.942c0 6.007 7.37 8.8" +
        "4 9.5 12.847 2.13-4.006 9.5-6.84 9.5-12.845 0-.171-.008-.34-.025-.5" +
        "06z'/%3E%3C/svg%3E";
        favoriteButtonText.style.color = '#5c616c';
    }
};

/**
 * Makes a colored banner fade in at the top of the page.
 *
 * @param  label     what you want it to say
 * @param  timeframe how long you want it to stay
 * @param  neutral   whether the background color is blue (default) or green
 * type    addBanner :: String -> Number -> Boolean -> Void
 */
const addBanner = (label, timeframe, status = 'neutral') => {
    // this is required later
    // see https://stackoverflow.com/questions/7715039
    const DELAY = 50;

    // convert timeframe from seconds to milliseconds and add delay
    let timeFrame = timeframe;
    timeFrame *= 1000;
    timeFrame += DELAY;

    // create the node
    const banner = document.createElement('div');

    // style the crap out of it
    banner.style.color = '#fff';
    banner.style.fontFamily = 'Arimo, Arial, sans-serif';
    banner.style.fontSize = '13px';
    banner.style.fontWeight = 'bold';
    banner.style.opacity = 0;
    banner.style.padding = '16.7px';
    banner.style.position = 'fixed';
    banner.style.top = 0;
    banner.style.left = 0;
    banner.style.textAlign = 'center';
    banner.style.textShadow = '0 0 1px rgba(0, 0, 0, 0.45)';
    banner.style.transition = 'opacity 1000ms';
    banner.style.width = '100%';
    banner.style.zIndex = 2147483647;

    // determine the color of the banner based on the status.
    // success = green, error = red, neutral (default) = blue
    switch (status) {
        case 'success':
            banner.style.backgroundColor = '#74a446';
            banner.style.border = '1px solid #618a3c';
            break;
        case 'error':
            banner.style.backgroundColor = '#d92620';
            banner.style.border = '1px solid #b21f1a';
            break;
        default:
            banner.style.backgroundColor = '#2793e6';
            banner.style.border = '1px solid #3a78ab';
            break;
    }

    // this is what the banner will read
    banner.innerHTML = label;

    // add it to the DOM, hidden
    document.body.appendChild(banner);

    // (almost) immediately make it appear
    setTimeout(() => {
        banner.style.opacity = 1;
    }, DELAY);

    // disappear after the specified timeframe
    setTimeout(() => {
        banner.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(banner);
        }, timeFrame);
    }, timeFrame);
};

/**
 * Adds the current video to your local favorites.
 *
 * type addFavorite :: Event -> Void
 */
let addFavorite = event => {
    // grab a fresh copy of your local favorites and the video data
    const favorites = getFavorites();
    const [id, title] = getVideoData();

    // add the video to the object
    favorites[id] = title;

    // save it to disk
    localStorage.setItem('ytfavorites', JSON.stringify(favorites));

    // update the favorite button
    updateFavoriteButton(
        event.target.button, event.target.icon, event.target.text
    );

    // let the user know it was added
    addBanner('Video added to local favorites!', 2, 'success');
};

/**
 * Removes the current video from your local favorites.
 *
 * type removeFavorite :: Event -> Void
 */
let removeFavorite = event => {
    // grab a fresh copy of your local favorites and the video data
    const favorites = getFavorites();
    const id = getVideoData()[0];

    // remove the video from the object
    delete favorites[id];

    // save it to disk
    localStorage.setItem('ytfavorites', JSON.stringify(favorites));

    // update the favorite button
    updateFavoriteButton(
        event.target.button, event.target.icon, event.target.text
    );

    // let the user know it was removed
    addBanner('Video removed from local favorites!', 2, 'success');
};

/**
 * Exports your local favorites to an external HTML file for easy viewing.
 *
 * type exportToHTML :: Void -> Void
 */
const exportToHTML = () => {
    // grab a fresh copy of your local favorites
    const favorites = getFavorites();

    // CSS markup
    const CSS = 'html{font-family:Arimo,sans-serif;font-size:13px;' +
        'background-color:#f1f1f1}body{background-color:#fff;' +
        'box-shadow:0 1px 2px rgba(0,0,0,.1);' +
        'padding:5px 20px;margin:30px}span{' +
        'background-color:#666;' +
        'border-radius:3px;color:#f0f0f0;padding:4px 6px}' +
        'li{padding:5px}a{color:#333!important}' +
        'a:hover{color:#167ac6!important}';

    // header markup
    const headerHTML = '<!doctype html>' +
        '<meta charset=utf-8>' +
        '<title>YouTube Local Favorites</title>' +
        `<style>${CSS}</style>` +
        '<h1>YouTube Local Favorites ' +
        `<span>${Object.keys(favorites).length}</span>` +
        '</h1>' +
        '<ol>';

    // loop through your favorites and HTMLify them
    let favoritesHTML = '';
    Object.keys(favorites).reverse().forEach((id) => {
        favoritesHTML += '<li>';
        favoritesHTML += `<a href="https://www.youtube.com/watch?v=${id}`;
        favoritesHTML += '" target=_blank>';
        favoritesHTML += `${favorites[id]}</a>`;
        favoritesHTML += '</li>';
    });

    // if there aren't any, tell the user to add some
    if (Object.keys(favorites).length === 0) {
        favoritesHTML += '</ol><p>You have no local favorites! Click the ' +
        '"Favorite" button on a video page to favorite a video, and ' +
        'it\'ll show up here (make sure to re-export to HTML).</p>';
    }

    // footer markup
    const footerHTML = Object.keys(favorites).length !== 0 ? '</ol>' : '';

    // open the link
    window.open().document.body.innerHTML = `${headerHTML}${favoritesHTML}` +
    `${footerHTML}`;
};

/**
 * Exports your local favorites to an external plaintext file for easy viewing.
 *
 * type exportToPlainText :: Void -> Void
 */
const exportToPlainText = () => {
    // grab a fresh copy of your local favorites
    const favorites = getFavorites();

    // loop through your favorites and plaintextify them
    let favoritesPlaintext = '\nYouTube Local Favorites\n\n';
    Object.keys(favorites).reverse().forEach((id) => {
        favoritesPlaintext += `${favorites[id]}: ` +
        `https://www.youtube.com/watch?v=${id}\n`;
    });

    // if there aren't any, tell the user to add some
    if (Object.keys(favorites).length === 0) {
        favoritesPlaintext += 'You have no local favorites! Click the ' +
        '"Favorite" button on a video page to favorite a video, and ' +
        'it\'ll show up here (make sure to re-export to Plain Text).';
    }

    // marginally sanitize the video titles
    favoritesPlaintext = encodeURIComponent(favoritesPlaintext);

    // open the link
    window.open(`data:;charset=utf-8,${favoritesPlaintext}`);
};

/**
 * Exports your local favorites to an external JSON file.
 *
 * type exportToJSON :: Void -> Void
 */
const exportToJSON = () => {
    /**
     * Generates a DateTimeStamp in localtime.
     *
     * @return a string that holds the current datetimestamp in localtime
     * type getDateTime :: Void -> String
     */
    const getDateTime = () => {
        let dateTime = new Date();

        // YYYY-MM-DDTHH.MM.SS
        dateTime = dateTime.getFullYear() +
        '-' + ('0' + (dateTime.getMonth() + 1)).slice(-2) +
        '-' + ('0' + dateTime.getDate()).slice(-2) +
        'T' + ('0' + dateTime.getHours()).slice(-2) +
        '.' + ('0' + dateTime.getMinutes()).slice(-2) +
        '.' + ('0' + dateTime.getSeconds()).slice(-2);

        return dateTime;
    };

    // Generates a DateTimeStamp in UTC.
    // const getDateTime = () => ((new Date()).toJSON()).replace(/:/g, '.');

    // grab a fresh copy of your local favorites
    let favorites = getFavorites();

    // marginally sanitize the video titles
    favorites = encodeURIComponent(JSON.stringify(favorites));

    // create an <a> that gets clicked
    const a = document.createElement('a');
    a.href = `data:text/JSON;charset=utf-8,${favorites}`;

    // set the custom filename
    // a.download = 'youtube-local-favorites.json';
    a.download = `youtube-local-favorites_${getDateTime()}.json`;

    // make the link invisible
    a.style.display = 'none';

    // append the link to the DOM, click it, and remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

/**
 * Imports local favorites from an external JSON file.
 *
 * type importFromJSON :: DOM Node -> DOM Node -> DOM Node -> Void
 */
const importFromJSON = (
    favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
) => {
    // create an <input> that only accepts JSON files
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';

    // read the file into localStorage
    input.addEventListener('change', () => {
        const importedFavorites = input.files[0];

        const reader = new FileReader();

        // this is executed when the settings file is imported
        reader.onload = () => {
            // save it to disk
            localStorage.setItem('ytfavorites', reader.result);

            // update the favorite button
            updateFavoriteButton(
                favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
            );

            // let the user know it was imported
            addBanner('Imported local favorites!', 2, 'success');
        };

        reader.readAsText(importedFavorites);
    });

    // open the file dialog
    input.click();
};

/**
 * Imports videos from a YouTube playlist. Highly experimental.
 *
 * "You've seen some really compelling userscripts here. They were slick,
 * they were robust. This is gonna be nothing like that. This can go wrong
 * in about 500 different ways."
 *
 * type importFromYouTubePlaylist :: DOM Node -> DOM Node -> DOM Node -> Void
 */
const importFromYouTubePlaylist = (
    favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
) => {
    /**
     * Fetches a URL dynamically (XMLHttpRequest wrapper).
     *
     * @param  URL          the URL to fetch
     * @param  responseType the format (document, JSON, etc.) we want returned
     * @return a promise that holds the response or an error message
     * type getURL :: String -> String -> Void
     */
    const getURL = (URL, responseType) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.responseType = responseType;

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({ status: xhr.status, statusText: xhr.statusText });
                }
            });

            xhr.addEventListener('error', () => {
                reject({ status: xhr.status, statusText: xhr.statusText });
            });

            xhr.open('GET', URL);

            xhr.send();
        });
    };

    /**
     * Grabs videos from a playlist table.
     *
     * @param  videoTable the <table> that holds the videos in the playlist
     * @return an object that holds the videos in the playlist
     * type extractVideos :: Object -> Object
     */
    const extractVideos = (videoTable) => {
        // grab all the video table rows
        const videoTableRows = Array.from(videoTable.querySelectorAll(
            'tr.pl-video.yt-uix-tile'
        ));

        // loop through rows, adding each video to the new playlist
        const playlist = videoTableRows.reduceRight((videos, video) => {
            const id = video.getAttribute('data-video-id');
            const title = video.getAttribute('data-title');
            videos[id] = title;
            return videos;
        }, {});

        return playlist;
    };

    /**
     * Loads all pages of a playlist until every video in the playlist is
     * stored.
     *
     * @param  videoTable   the <table> that holds the videos in the playlist
     * @param  playlist     an object holding the existing videos in the
     *                      playlist
     * @param  responseType the format of the videoTable to parse
     * @return an object holding every video in the entire playlist
     * type loadPages :: Object -> Object -> String -> Object
     */
    const loadPages = async (videoTable, playlist, responseType) => {
        // if this is a playlist loaded with the "Load more" button, create a
        // traversable DOM with the contents of the playlist
        const videos = videoTable.content_html;
        const loadMoreWidget = videoTable.load_more_widget_html;
        const html = document.createElement('html');
        html.innerHTML = '<table>' + videos + '</table>';

        if (responseType === 'json') {
            videoTable = html;
        }

        // grab and store videos, and add them to the existing playlist
        const newPlaylist = extractVideos(videoTable);

        // once again create a traversable DOM with the contents of the
        // "Load more" widget
        if (responseType === 'json') {
            html.innerHTML = '<body>' + loadMoreWidget + '</body>';
            videoTable = html;
        }

        // base case: if there's no "Load more" button, return the playlist
        const loadMoreButton = videoTable.querySelector('.load-more-button');
        if (!loadMoreButton) {
            console.log('No "Load more" button found, exiting loadPages()...');
            return Object.assign({}, newPlaylist, playlist);
            // Object spread operator: uncomment and replace when the spec is
            // finalized and there's better browser support
            // return { ...newPlaylist, ...playlist };
        }

        // "Load more" button exists, so load more videos
        const href = loadMoreButton.getAttribute('data-uix-load-more-href');
        const newVideoTable = await getURL(
            'https://www.youtube.com' + href, 'json'
        );

        return Object.assign(
            {}, await loadPages(newVideoTable, newPlaylist, 'json'), playlist
        );
        // Object spread operator: uncomment and replace when the spec is
        // finalized and there's better browser support
        // return {
        //     ...await loadPages(newVideoTable, newPlaylist, 'json'),
        //     ...playlist
        // };
    };

    /**
     * Loads all the videos in the playlist and stores them in localStorage.
     *
     * type loadPlaylist :: Void -> Void
     */
    const loadPlaylist = async () => {
        // let the user know we're importing
        addBanner('Importing playlist, please wait...', 2);

        // store the videos here
        let playlist = {};

        try {
            const playlistId = document.querySelector(
                'div.playlist-header-content'
            ).getAttribute('data-full-list-id');

            const initialPlaylist = await getURL(
                `https://www.youtube.com/playlist?list=${playlistId}`,
                'document'
            );

            playlist = await loadPages(initialPlaylist, playlist, 'document');

            // save them all to disk
            localStorage.setItem('ytfavorites', JSON.stringify(playlist));

            // update the favorite button
            updateFavoriteButton(
                favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
            );

            // display banner!
            addBanner('Imported playlist!', 2, 'success');
        } catch (err) {
            console.error(err);
            addBanner(
                'Something went wrong, couldn\'t import playlist :(',
                'error'
            );
        }
    };

    // ask the user if they're sure
    if (!confirm(
        'Import YouTube Playlist? All existing local favorites will be ' +
        'replaced by the playlist.'
    )) {
        return;
    }
    // load the playlist
    loadPlaylist(favoriteButton, favoriteButtonHeartIcon, favoriteButtonText);
};

/**
 * Removes all your local favorites.
 *
 * type removeAllFavorites :: DOM Node -> DOM Node -> DOM Node -> Void
 */
const removeAllFavorites = (
    favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
) => {
    // ask the user if they're sure
    if (!confirm('Delete all local favorites?')) {
        return;
    }

    // delete it all
    localStorage.removeItem('ytfavorites');

    // update the favorite button
    updateFavoriteButton(
        favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
    );

    // let the user know it was all deleted
    addBanner('All local favorites removed!', 2, 'success');
};

/**
 * Creates a menu item in the favorites menu.
 *
 * @param label    what the menu item will say
 * @param callback what is executed when the menu item button is clicked
 * @param header   whether it's a menu item heading (default) or not
 * @param indented whether it's indented in the menu (default) or not
 * @return         a DOM node containing the menu item
 * type createMenuItem :: String -> Function -> Boolean -> Boolean -> DOM Node
 */
const createMenuItem = (label, callback, header = false, indented = true) => {
    const menuItem = document.createElement('li');

    // if it's a header, set a few minimal styles and return it right away
    if (header) {
        menuItem.setAttribute(
            'style',
            'color: #333; font-weight: bold; padding: 6px 6px 6px 11px;'
        );
        menuItem.innerHTML = label;

        return menuItem;
    }

    // execute the callback function when the menu item button is clicked
    menuItem.addEventListener('click', callback);

    const menuItemText = document.createElement('span');
    menuItemText.classList.add('yt-uix-button-menu-item');
    menuItemText.innerHTML = label;

    // this is primarily for the "Remove All" button
    if (!indented) {
        menuItem.setAttribute('style', 'font-weight: bold;');
        menuItemText.setAttribute('style', 'padding-left: 11px;');
    }

    // <li>.appendChild(<span>);
    menuItem.appendChild(menuItemText);

    return menuItem;
};

/**
 * Creates all the elements used in the UI.
 *
 * @return the DOM Nodes containing the elements for the favorite button
 * type createAndConstructElements :: Void -> [DOM Nodes]
 */
const createAndConstructElements = () => {
    //
    // Favorite Button
    //
    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('yt-uix-button');
    favoriteButton.classList.add('yt-uix-button-size-default');
    favoriteButton.classList.add('yt-uix-button-opacity');
    favoriteButton.classList.add('yt-uix-button-has-icon');
    favoriteButton.classList.add('no-icon-markup');
    favoriteButton.classList.add('yt-uix-button-opacity');
    favoriteButton.classList.add('yt-uix-tooltip');
    favoriteButton.title = 'Add to local favorites';
    favoriteButton.type = 'button';

    const favoriteButtonText = document.createElement('span');
    favoriteButtonText.classList.add('yt-uix-button-content');
    favoriteButtonText.innerHTML = 'Favorite';

    const favoriteButtonHeart = document.createElement('span');
    favoriteButtonHeart.classList.add('yt-uix-button-heart');
    favoriteButtonHeart.classList.add('yt-uix-button-icon-wrapper');

    const favoriteButtonHeartIcon = document.createElement('img');
    favoriteButtonHeartIcon.classList.add('yt-uix-button-heart-icon');
    favoriteButtonHeartIcon.classList.add('yt-uix-button-icon');
    favoriteButtonHeartIcon.classList.add('yt-sprite');
    favoriteButtonHeartIcon.src = "data:image/svg+xml,%3Csvg xmlns='http://w" +
    "ww.w3.org/2000/svg' version='1' viewBox='0 0 19 17.788556' width='19' h" +
    "eight='17.789' fill='%23000'%3E%3Cpath d='M18.975 4.437A4.944 4.944 0 0" +
    " 0 9.5 3.028 4.944 4.944 0 0 0 0 4.942c0 6.007 7.37 8.84 9.5 12.847 2.1" +
    "3-4.006 9.5-6.84 9.5-12.845 0-.171-.008-.34-.025-.506z'/%3E%3C/svg%3E";

    //
    // Favorites Menu :: Button
    //
    const favoritesMenuButton = document.createElement('button');
    favoritesMenuButton.classList.add('end');
    favoritesMenuButton.classList.add('yt-uix-button');
    favoritesMenuButton.classList.add('yt-uix-button-text');
    favoritesMenuButton.classList.add('yt-uix-tooltip');
    favoritesMenuButton.setAttribute('data-tooltip-text', 'Favorites Menu');
    favoritesMenuButton.title = 'Favorites Menu';
    favoritesMenuButton.type = 'button';

    const favoritesMenuArrow = document.createElement('img');
    favoritesMenuArrow.classList.add('yt-uix-button-arrow');
    favoritesMenuArrow.setAttribute('alt', 'Favorites Menu');
    favoritesMenuArrow.src = '//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif';
    favoritesMenuArrow.style.margin = '0';

    //
    // Favorites Menu :: List <ul>
    //
    const favoritesMenu = document.createElement('ul');
    favoritesMenu.classList.add('yt-uix-button-menu');
    favoritesMenu.classList.add('yt-uix-button-menu-default');
    favoritesMenu.classList.add('yt-uix-button-menu-external');
    favoritesMenu.setAttribute(
        'style',
        'min-width: 28px; left: 397px; top: 630px; display: none;'
    );

    //
    // Favorites Menu :: Export Options (HTML, Plain Text, JSON)
    //
    const exportHeader = createMenuItem('Export', {}, true, false);
    const exportHTMLButton = createMenuItem('HTML', exportToHTML);
    const exportPlainTextButton = createMenuItem(
        'Plain Text', exportToPlainText
    );
    const exportJSONButton = createMenuItem('JSON', exportToJSON);

    //
    // Favorites Menu :: Import Options (JSON, YouTube Playlist) + Remove All
    //
    const importHeader = createMenuItem('Import', {}, true, false);
    const importJSONButton = createMenuItem('JSON', importFromJSON.bind(null,
        favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
    ));
    const importYouTubePlaylistButton = createMenuItem('YouTube Playlist',
        importFromYouTubePlaylist.bind(null,
            favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
        )
    );
    const removeAllButton = createMenuItem(
        'Remove All', removeAllFavorites.bind(null,
            favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
        ), false, false
    );

    /*
     ##############################
     ### Construct the elements ###
     ##############################
     */

    //
    // Favorite Button
    //

    // <span>.appendChild(<img>);
    favoriteButtonHeart.appendChild(favoriteButtonHeartIcon);

    // <button>.appendChild(<span>, <span>);
    favoriteButton.appendChild(favoriteButtonHeart);
    favoriteButton.appendChild(favoriteButtonText);

    //
    // Favorites Menu
    //

    // <ul>.appendChild(<li>)
    favoritesMenu.appendChild(exportHeader);
    favoritesMenu.appendChild(exportHTMLButton);
    favoritesMenu.appendChild(exportPlainTextButton);
    favoritesMenu.appendChild(exportJSONButton);
    favoritesMenu.appendChild(importHeader);
    favoritesMenu.appendChild(importJSONButton);

    // if the video is part of a playlist, add the option to import the entire
    // playlist
    if (document.querySelector('div.playlist-header-content')) {
        favoritesMenu.appendChild(importYouTubePlaylistButton);
    }

    favoritesMenu.appendChild(removeAllButton);

    // <button>.appendChild(<img>, <ul>);
    favoritesMenuButton.appendChild(favoritesMenuArrow);
    favoritesMenuButton.appendChild(favoritesMenu);

    return [
        favoriteButton,
        favoriteButtonHeartIcon,
        favoriteButtonText,
        favoritesMenuButton
    ];
};

/**
 * Adds the Favorite and Favorites Menu buttons to the DOM.
 *
 * type addFavoriteButtonsToDOM :: DOM Node -> DOM Node -> Void
 */
const addFavoriteButtonsToDOM = (favoriteButton, favoritesMenuButton) => {
    // <div>.insertBefore(<button>, <button>);
    const buttonRow = document.querySelector('#watch8-secondary-actions');
    const addToPlaylistsButton = document.querySelector(
        '#watch8-secondary-actions > :first-child'
    );
    buttonRow.insertBefore(favoriteButton, addToPlaylistsButton);
    buttonRow.insertBefore(favoritesMenuButton, addToPlaylistsButton);
};

/**
 * Main program function.
 *
 * type main :: Void -> Void
 */
const main = () => {
    // construct the elements
    const [
        favoriteButton,
        favoriteButtonHeartIcon,
        favoriteButtonText,
        favoritesMenuButton
    ] = createAndConstructElements();

    // add and initialize the favorite button right away
    addFavoriteButtonsToDOM(favoriteButton, favoritesMenuButton);
    updateFavoriteButton(
        favoriteButton, favoriteButtonHeartIcon, favoriteButtonText
    );
};

// SPF support: re-add the buttons to the DOM after a page load
window.addEventListener('spfdone', () => {
    main();
});

main();
}());

