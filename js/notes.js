chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "olx") {
            loadDataFromChromeStorage();
        }
    });

chrome.storage.onChanged.addListener(function (changes, namespace) {
    loadDataFromChromeStorage();
});

var notesForAds = {};

$(document).ready(function () {
    loadDataFromChromeStorage();
});

function loadDataFromChromeStorage() {
    chrome.storage.sync.get("notesForAds", function (obj) {
        if (obj !== null && obj.hasOwnProperty('notesForAds')) {
            var hatedKeywordsJSON = obj['notesForAds'];
            notesForAds = JSON.parse(hatedKeywordsJSON);
            console.log('OLX Observed ads notes: Notes reloaded from Chrome storage');
            addNotesButtonToAllAdds();
        } else {
            addNotesButtonToAllAdds();
        }
    });
}

function addNotesButtonToAllAdds() {
    const observedAdsLis = $("li.observedad[data-adid]");
    $(observedAdsLis).each(function (index, item) {
        addNotesButtonToAdd(item);
    });

}

function addNotesButtonToAdd(addListItem) {
    const favtabDiv = addListItem.querySelector('.favtab.br3.abs.zi4.observelinkgallery');
    const addId = $(addListItem).data('adid');
    $(favtabDiv).prepend('<img class="custom-notes-button" style="height: 20px;position: absolute;right: 20px;" src="' + chrome.runtime.getURL('/icons/32.png') + '"/>');

    const notesButton = favtabDiv.querySelector(".custom-notes-button");

    $(notesButton).click(function () {
        openNotesWidget(addId);
    });

    if (notesForAds[addId]) {
        openNotesWidget(addId);
    }
}

function openNotesWidget(adid) {
    const adLi = getAdListItemForAdId(adid);
    var textareaForAd = $("textarea[data-adid=" + adid + "]");
    if (!textareaForAd || textareaForAd.length === 0) {
        textareaForAd = $.parseHTML('<textarea data-adid="' + adid + '" style="resize: auto; width: 95%; margin-bottom: 35px"></textarea>');
        adLi.append(textareaForAd);
        $(adLi).css("height", "auto");

        $(textareaForAd).focusout(function () {
            notesForAds[adid] = $(textareaForAd).val();
            storeDataInChromeStorage();
        });
    }
    if (notesForAds[adid]) {
        $(textareaForAd).val(notesForAds[adid]);
    }
}

function storeDataInChromeStorage() {

    const jsonToSave = JSON.stringify(notesForAds);

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'notesForAds': jsonToSave}, function () {
        // Notify that we saved.
        console.log('OLX Observed ads notes: Notes saved to Chrome storage');
    });
}


function getAdListItemForAdId(adId) {
    return $("li.observedad[data-adid=" + adId + "]");
}
