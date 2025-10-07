let testData = {
    metros: "false",
    eihaTeams: 1
}

// let additionalFormData = testData;
let additionalFormData = {};

// currentSteamerCompleteCallback(document.querySelector('#reg-current-steamer-complete'));

function currentSteamerCompleteCallback(element) {
    const data = computeAdditionalFormData();
    const a = element.querySelector('#result-link');

    if (data.invalid) {
        element.querySelector('#result-type').innerText = "🤔 HMMM..";
        element.querySelector('#result-text').innerHTML = `
        Looks like you don't fall into any of these categories.
        <br />
        <br />
        Don't panic! We can still sort you out!
        <br />
        <br />
        Please contact us directly at <a class="link" href="mailto:manchestersteamers@gmail.com">manchestersteamers@gmail.com</a>
        `;
        a.parentElement.remove();
        return;
    }

    console.log(data);

    if (data.upgrade) {

        a.href = "https://www.cognitoforms.com/EnglishIceHockeyAssociation/EIHRecreationalRegistrationUpgradeApplication2526"
        a.innerHTML = `UPGRADE FORM <i class="fa fa-external-link" aria-hidden="true"></i>`;

        document.querySelectorAll('.show-only-upgrade').forEach((element) => {
            element.classList.add("active");
        });

        element.querySelector('#result-upgrade-option').innerHTML = data.regOption

        if (data.isMetros) {
            if (data.eihaTeams == 0) {
                element.querySelector('#result-type').innerText = "🏒 Metros Players";
                element.querySelector('#result-text').innerHTML = `
                    You're a Metros player with <span class="red">no</span> EIHA registered team registrations.
                    <br />
                    <br />
                    You can use the <b>Upgrade Registration Form</b> below for a BUIHA Upgrade.
                    `;
            } else {
                element.querySelector('#result-type').innerText = "🏒🥅 Metros & Recreational Players";
                element.querySelector('#result-text').innerHTML = `
                    You're a Metros player with <span class="red">${data.eihaTeams}</span> EIHA registered team registration(s).
                    <br />
                    <br />
                    You can use the <b>Upgrade Registration Form</b> below to register a 2nd/3rd recreational team.
                    `;
            }
        } else {
            element.querySelector('#result-type').innerText = "🏒 Recreational Players";
            element.querySelector('#result-text').innerHTML = `
                You're a Recreational player in <span class="red">${data.eihaTeams}</span> EIHA registered team(s).
                <br />
                <br />
                You can use the <b>Upgrade Registration Form</b> below to register a 2nd/3rd recreational team.
                `;
        }

    } else {
        a.href = "https://www.cognitoforms.com/EnglishIceHockeyAssociation/EIHRecSectionPlayerRegistrationApplicationForm2526";
        a.innerHTML = `NEW PLAYER FORM <i class="fa fa-external-link" aria-hidden="true"></i>`;

        element.querySelector('#result-type').innerText = "✨ New Players";
        element.querySelector('#result-text').innerHTML = `
            You're a brand new player to Recreational hockey, and aren't playing the Metros currently.
            <br />
            <br />
            You can use the <b>New Player Form</b> below to register with us.
            `;

        document.querySelectorAll('.show-only-new-players').forEach((element) => {
            element.classList.add("active");
        });
    }
}

function computeAdditionalFormData() {
    const isMetros = additionalFormData.metros == "true";
    const eihaTeams = parseInt(additionalFormData.eihaTeams) || 0;

    // This is a Metros player NOT in a EIHA team (BUIHA Upgrade)
    if (isMetros && eihaTeams == 0) {
        return {
            upgrade: true,
            regOption: `✅ Since you're a Metros player, choose <span class="gold">BUIHA Upgrade</span>`,
            isMetros: true,
            eihaTeams: 0
        }
    }

    // This is a brand-new player (New Player form)
    if (!isMetros && eihaTeams === 0) {
        return {
            upgrade: false,
            regOption: `✅ Select <span class="gold"></span>`
        };
    }

    if (eihaTeams > 0 && eihaTeams < 3) {
        return {
            upgrade: true,
            regOption: `✅ Since you're in a Rec team, choose <span class="gold">Recreational 2nd/3rd Team Registration</span>`,
            isMetros: isMetros,
            eihaTeams: eihaTeams
        };
    }

    // This is generally impossible but we should ask them to contact us
    // Weird case rly but who knows!!!!!!!!!!!!!! 😔😔😔😔😔😔
    return {
        invalid: true
    }
}

document.querySelectorAll('.button-group-selectable-one').forEach((group) => {
    group.querySelectorAll('.selectable').forEach((button) => {
        button.addEventListener('click', function (event) {
            handleSingleOptionChosen(this);
            handleProgressionElementClick(this);
        });
    })
})

function handleSingleOptionChosen(element) {
    const key = element.getAttribute('data-key');
    if (key) {
        const value = element.getAttribute('data-value');
        additionalFormData[key] = value;
    }

    element.classList.add('active');
    element.parentElement.classList.add('done');
}

function handleProgressionElementClick(element) {
    const next = element.getAttribute('data-next');
    if (next) {
        const element = document.getElementById(next);

        if (!element) {
            return;
        }

        element.classList.add('active');
        if (next == "reg-current-steamer-complete") {
            currentSteamerCompleteCallback(element);
            const text = element.querySelector("#result-text");
            text.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "center"
            });
        } else {
            element.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "center"
            });
        }
    }
}

async function setClipboard(text) {
    const type = "text/plain";
    const clipboardItemData = {
        [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
}
