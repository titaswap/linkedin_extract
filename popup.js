//----------------------------extension section start---------------------
let personName = document.querySelector('.personName');
let personTitle = document.querySelector('.personTitle');
let personEmail = document.querySelector('.email');
let allData = document.querySelector('.allData');
let linkedinLink = document.querySelector('.linkedinLink');
const btn = document.querySelector('.linkedinBtn');
btn.addEventListener('click', function () {
    btn.style.backgroundColor = 'red';
})
btn.addEventListener('click', linkedinDataExtactor)
//----------------------------get browser data extension section ---------------------
async function linkedinDataExtactor() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor,
        },
        async (injectionResults) => {
            const [data] = injectionResults;
            if (data.result) {
                let mainPersonName = data.result.personName;
                let mainTitle = data.result.mainTitle;
                let email = data.result.email;
                let linkedinUrl = data.result.url;
                personName.innerText = mainPersonName
                personTitle.innerText = mainTitle;
                linkedinLink.innerText = linkedinUrl;
                if (email == undefined) {
                    personEmail.innerText = '';
                }
                else {
                    personEmail.innerText = email;
                }
            }
            try {
                await navigator.clipboard.writeText(allData.innerText);
            }
            catch (err) {
                console.error(err);
            }
            console.log(injectionResults);

        }
    );
};

//----------------------------browser section start---------------------
function pickColor() {
    let imageEliment = document.querySelector('div.presence-entity--size-8')
    let url = window.location.href;
    let salesLink = 'linkedin.com/sales/lead';
    let salesNavigatorCheck = url.indexOf(salesLink);

    // ----------------------------------------it is a salesLink
    if (salesNavigatorCheck > 0) {
        let salesPersonName = document.querySelector('h1._headingText_e3b563').innerText;
        let salesTitle = document.querySelector('li:nth-of-type(1) ._lockup-content_p4eb22 h2').innerText;
        let apolloEmail = document.querySelector('div.x_1mqW-');
        if (apolloEmail !== null) {
            linkedinLink()
            return lastfn2();
        }
        else {
            linkedinLink()
            let all = {
                personName: salesPersonName,
                mainTitle: salesTitle,
                email: '',
                url: imageEliment.innerText,
            }
            return all; 
        }
        function lastfn2() {
            let apolloEmailText = apolloEmail.innerText;
            let all = {
                personName: salesPersonName,
                mainTitle: salesTitle,
                email: apolloEmailText,
                url: imageEliment.innerText,
            }
            console.log('it is salesLink');
            return all; 
        }
        
    }

    // -----------------------------------------------------it is not a salesLink
    else if (salesNavigatorCheck < 0) {
        function getElementByXpath(path) {
            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        };

        let pushXpath = '//div[@id="experience"]/parent::* /div[@class="pvs-list__outer-container"] //span[@aria-hidden="true"]';
        let mainPersonName = document.querySelector('h1');
        let mainTitle = getElementByXpath(pushXpath);
        let apolloEmail = document.querySelector('div.x_1mqW-');
        let namePersonText = mainPersonName.innerText;
        let mainTitleText = mainTitle.innerText;
        if (apolloEmail !== null) {
            return lastfn()
        }
        else {
            console.log('it is not salesLink apollo email nai');
            let all = {
                personName: namePersonText,
                mainTitle: mainTitleText,
                email: '',
                url: url,
            }
            return all;
        }
        function lastfn() {
            console.log('it is not salesLink apollo email ache')
            let apolloEmailText = apolloEmail.innerText;
            let all = {
                personName: namePersonText,
                mainTitle: mainTitleText,
                email: apolloEmailText,
                url: url,
            }
            return all;
        }
    }

    
    function linkedinLink() {
        let linkedinClick = document.querySelector("button[id*='hue-menu-trigger-ember']");
        var number = 0;
        function waitAndClik() {
            var count = ++number;
            if (count == 1) {
                linkedinClick.click();
            }
            else if (count == 2) {
                linkCollect()
                clearInterval(myTimer)
            }
            else {
                clearInterval(myTimer)
            }
            console.log('2', count)
            return;
        }
        var myTimer = setInterval(waitAndClik, 0.1);
        function linkCollect() {
            let linkedinLinkCollect = document.querySelectorAll('.ember-view._item_1xnv7i')[2];
            imageEliment.innerText = linkedinLinkCollect.href;
        }
    }
    
}

//----------------------------browser section start for google---------------------

window.addEventListener('load', linkedinDataExtactor);