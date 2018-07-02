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
    $(favtabDiv).prepend('<a class="custom-notes-button">N</a>');

    const customAnchor = favtabDiv.querySelector(".custom-notes-button");

    $(customAnchor).click(function () {
        openNotesWidget($(addListItem).data('adid'));
    });
}

function openNotesWidget(adid) {
    console.log('Notes widget for: ' + adid);
    const noteText = prompt('Enter note');
}
