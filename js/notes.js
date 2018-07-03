chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "olx") {
            init();
        }
    });

chrome.storage.onChanged.addListener(function (changes, namespace) {
    init();
});


$(document).ready(function () {
    init();
});


function init() {
    addNotesButtonToAllAdds();
}

function addNotesButtonToAllAdds() {
    console.log('Trying to add Notes Button to all adds');
    const observedAdsLis = $("li.observedad[data-adid]");
    $(observedAdsLis).each(function (index, item) {
        addNotesButtonToAdd(item);
    });

}

function addNotesButtonToAdd(addListItem) {
    const favtabDiv = addListItem.querySelector('.favtab.br3.abs.zi4.observelinkgallery');
    $(favtabDiv).prepend('<img class="custom-notes-button" style="height: 20px;position: absolute;right: 20px;" src="' + chrome.runtime.getURL('/icons/32.png') + '"/>');

    const notesButton = favtabDiv.querySelector(".custom-notes-button");

    $(notesButton).click(function () {
        openNotesWidget($(addListItem).data('adid'));
    });
}

function openNotesWidget(adid) {
    const adLi = $("li.observedad[data-adid=" + adid + "]");
    const textareaForAd = $("textarea[data-adid=" + adid + "]");
    if (!textareaForAd || textareaForAd.length === 0) {
        adLi.append('<textarea data-adid="' + adid + '" style="resize: auto; width: 95%; margin-bottom: 35px"></textarea>');
        $(adLi).css("height", "auto");
    }

}
