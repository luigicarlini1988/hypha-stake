async function getStats() {
    const data = await HyphaHDK.getStats();

    if (!data) return;
    //TODO: add loading state

    document.getElementById("network-dho-count").innerText = data?.totalDHOCount;

    document.getElementById("network-agreements-count").innerText = data?.totalAgreementsCount;
    document.getElementById("network-people-count").innerText = data?.totalPeopleCount;

}

async function listDHO() {
    const data = await HyphaHDK.listDHO();

    console.log(data)
    if (!data) return;
    //TODO: add loading state

    const dhoCardComponent = (dho, index) => `
            <div class="top-dao-info flex wrap">
                <div class="full-space">
                    <img class="dao-logo" src="${dho.logo}" />
                </div>
                <div class="full-space">
                    <p class="title-20 dao-name white">${dho.name}</p>
                    <p class="grey-20 text-12">Active Since <span>${timeSince(dho.activeSince)}</span> <span class="white">Understaked</span></span></p>
                </div>
            </div>

            <div class="dao-activity-metrics">
                <div class="ui-input-data full-space flex space-center centered-vertical gap-6">
                    <div class="flex centered-vertical">
                        <img src="img/members.svg" />
                        <span class="text-12 grey">DAO Members</span>
                    </div>
                    <div class="flex">
                        <span class="text-12 white">${formatNumber(dho.peopleCount)}</span>
                    </div>
                </div>
                <div class="ui-input-data full-space flex space-center centered-vertical gap-6">
                    <div class="flex centered-vertical">
                        <img src="img/proposals.svg" />
                        <span class="text-12 grey">Proposals</span>
                    </div>
                    <div class="flex">
                        <span class="text-12 white">${formatNumber(dho.agreementCount)}</span>
                    </div>
                </div>
            </div>

            <div class="dao-stake-metrics">
                <div class="stake-bar">
                    <div class="flex space-center">
                        <span class="text-12 grey">Stake Progress</span>
                        <span class="text-12 white">${dho.stakeProgress}%</span>
                    </div>
                    <div class="progress-bar standard">
                        <div class="progress-inside-bar" style="width: ${dho.stakeProgress}%"></div>
                    </div>
                </div>
                <div class="ui-input-data full-space flex space-center centered-vertical gap-6">
                    <div class="flex centered-vertical">
                        <img src="img/logo-round.svg" />
                        <span class="text-12 grey">Requirement</span>
                    </div>
                    <div class="flex">
                        <span class="text-12 white">${formatNumber(dho.stakeRequired)}</span>
                    </div>
                </div>
                <div class="ui-input-data full-space flex space-center centered-vertical gap-6">
                    <div class="flex centered-vertical">
                        <img src="img/logo-round.svg" />
                        <span class="text-12 grey">To Stake</span>
                    </div>
                    <div class="flex">
                        <span class="text-12 white">${formatNumber(dho.stakeMissing)}</span>
                    </div>
                </div>
            </div>

            <div class="flex dao-card-buttons gap-20">
                <a href="#" class="fake-button secondary">Details</a>
                <button id="stake-btn" class="primary" onclick="stake()">Stake</button>
            </div>
    `;

    //map data into dho card
    data?.dhoList?.map((dho, index) => {
        const dhoCard = document.createElement("div");

        dhoCard.className = "dao-card";
        dhoCard.id = index;
        dhoCard.innerHTML = dhoCardComponent(dho, index);

        dhoCard.addEventListener("click", function (e) {
            //on stake click update modal data
            if (e.target.id === "stake-btn") {
                const dho = data.dhoList[e.currentTarget.id];

                if (dho) {
                    document.getElementById("stake-dho-logo").src = dho?.logo;
                    document.getElementById("stake-dho-name").innerText = dho?.name;
                    document.getElementById("stake-requirement-value").innerText =
                        dho?.stakeRequired;
                    document.getElementById("stake-amount-value").innerText =
                        dho?.stakeMissing;
                }
            }
        });

        document.getElementById("dao-grid").appendChild(dhoCard);
    });
}


let session
async function login() {
    session = await HyphaHDK.wallet.login()
}

async function stake() {
    const data = await HyphaHDK.stake({ to: 'hypha', quantity: 111.00 })
    console.log(data)
}


async function connectWallet() {
    // if (!session) login()
    //     const wallet = await HyphaHDK.connectWallet();
    //   //account, balance, session, user
    console.log('eeeee')
    session = await HyphaHDK.wallet.restoreSession()

    if (session) {
        const actor = JSON.stringify(session.actor)
        document.getElementById("actor").innerText = actor;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    connectWallet();
    getStats();
    listDHO();

    // document.getElementById("login-btn").addEventListener("click", login);

    // document
    //   .getElementById("search-input")
    //   .addEventListener("input", function (e) {
    //     console.log(e.target.value);
    //   });

    // document
    //   .getElementById("filter-select")
    //   .addEventListener("change", function (e) {
    //     console.log(e.target.value);
    //   });

    // let observer = new IntersectionObserver(
    //   (entries, observer) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         loadMoreContent();
    //         // Optionally, you can unobserve the sentinel element if you don't want more calls
    //         // observer.unobserve(entry.target);
    //       }
    //     });
    //   },
    //   {
    //     root: null, // observing for viewport
    //     rootMargin: "0px",
    //     threshold: 1.0, // Trigger when 100% of the target is visible
    //   },
    // );

    // // Add a sentinel element at the end of the content you're observing
    // let sentinel = document.createElement("div");
    // document.body.appendChild(sentinel);

    // // Start observing the sentinel
    // observer.observe(sentinel);

    // function loadMoreContent() {
    //   // Example: Append new content and update the sentinel's position
    //   const newContent = document.createElement("div");
    //   newContent.innerHTML = "<p>More content...</p>";
    //   document.body.insertBefore(newContent, sentinel);
    // }
});
