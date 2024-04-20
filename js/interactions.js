//stake-pop-up
function toggleModalStake() {
    document.getElementById("stake-modal-pop").classList.toggle("show");
    document.body.classList.toggle("no-scroll");
}

//menu
function toggleNavMenu() {
    document.getElementById("resp-menu-icon").classList.toggle("close");
    document.getElementById("main-menu").classList.toggle("show");
    document.body.classList.toggle("no-scroll");
}

//filters
function toggleFilters() {
    document.getElementById("filter-modal-pop").classList.toggle("show");
    document.body.classList.toggle("no-scroll");
}

//extra purpose in DAO details
function toggleExtraPurpose() {
    document.getElementById("extra-purpose").classList.toggle("show");
    document.getElementById("expand-purpose").classList.toggle("shown");
}

