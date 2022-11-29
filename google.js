//----------------------------extension section start---------------------
let webSite = document.querySelector('.webSite');
let phone = document.querySelector('.phone');
let googleAllData = document.querySelector('.googleAllData');
const googleBtn = document.querySelector('.googleBtn');
googleBtn.addEventListener('click', function () {
    googleBtn.style.backgroundColor = 'red';
})
googleBtn.addEventListener('click', googleDataExtactor)

//----------------------------get browser data extension section ---------------------
async function googleDataExtactor() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: googleInfo,
        },
        async (injectionResults) => {
            const [data] = injectionResults;
            if (data.result) {
                let getWebsite = data.result.webSite;
                let getPhone = data.result.phone;
                let removeCountryCode = getPhone.replace('+1 ', "");
                webSite.innerText = getWebsite;
                phone.innerText = removeCountryCode;
            }
            try {
                await navigator.clipboard.writeText(googleAllData.innerText);
            }
            catch (err) {
                console.error(err);
            }
            console.log(injectionResults);

        }
    );
    
};


//----------------------------browser section start---------------------
function googleInfo() {
    let webSite = document.querySelector('a.ab_button[ping]').href;
    function phoneNumber(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    let phoneXpath = phoneNumber("//*[text()='Phone']/parent::*/parent::*//*[contains(text(), '+')]/parent::*");
    let phoneText = phoneXpath.innerText;
    let googleData = {
        webSite: webSite,
        phone: phoneText,
    }
    return googleData;
}


window.addEventListener('load', googleDataExtactor);