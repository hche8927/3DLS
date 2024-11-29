document.addEventListener('DOMContentLoaded', initializeDics);

function initializeDics() {
    const dicsContainers = document.querySelectorAll('.b-dics');
    dicsContainers.forEach((container, index) => {
        new Dics({
            container: container,
            hideTexts: false,
            textPosition: "bottom",
        });
    });
}

/**
 * Handles object scene events.
 * @param {number} idx - Index for the current object.
 * @param {number} selectorId - ID of the selector.
 * @param {string} navId - Navigation element ID.
 */
function objectSceneEvent(idx, selectorId, navId) {
    const dics = document.querySelectorAll('.b-dics')[selectorId];
    if (!dics) {
        console.error(`Dics container not found for selectorId: ${selectorId}`);
        return;
    }

    const sections = dics.getElementsByClassName('b-dics__section');
    const imagesLength = 3;

    updateImages(sections, idx, imagesLength, 'object');
    updateTabStates(navId, idx);
}

/**
 * Updates the images in the specified sections based on the index and slider type.
 * @param {HTMLCollection} sections - Collection of sections to update.
 * @param {number} idx - Index to determine the folder.
 * @param {number} imagesLength - Number of images to update.
 * @param {string} sliderType - Type of the slider (e.g., 'object').
 */
function updateImages(sections, idx, imagesLength, sliderType) {
    for (let i = 0; i < imagesLength; i++) {
        const imageContainer = sections[i]?.querySelector('.b-dics__image-container');
        const image = imageContainer?.querySelector('.b-dics__image');
        if (image) {
            const imageFolder = getImageFolder(idx, sliderType);
            const imageFileName = getImageFileName(i, sliderType);
            image.src = `./static/images/results/${imageFolder}/${imageFileName}`;
        }
    }
}

/**
 * Updates the state of the navigation tabs.
 * @param {string} navId - Navigation element ID.
 * @param {number} activeIdx - Index of the active tab.
 */
function updateTabStates(navId, activeIdx) {
    const navItems = document.getElementById(navId)?.getElementsByClassName('nav-item');
    if (!navItems) {
        console.error(`Navigation items not found for navId: ${navId}`);
        return;
    }

    Array.from(navItems).forEach((item, index) => {
        const link = item.children[0];
        if (link) {
            link.className = index === activeIdx ? "nav-link active" : "nav-link";
        }
    });
}

/**
 * Returns the folder name based on the index and slider type.
 * @param {number} idx - Index to determine the folder.
 * @param {string} sliderType - Type of the slider (not used currently but reserved for future use).
 * @returns {string} Folder name.
 */
function getImageFolder(idx, sliderType) {
    const folders = ['bicycle', 'garden', 'flowers', 'bonsai', 'room', 'train', 'truck'];
    return folders[idx] || 'default';
}

/**
 * Returns the file name based on the image index and slider type.
 * @param {number} imageIndex - Index of the image.
 * @param {string} sliderType - Type of the slider (not used currently but reserved for future use).
 * @returns {string} File name.
 */
function getImageFileName(imageIndex, sliderType) {
    const filenames = ['gs.png', 'ls.png', 'gt.png'];
    return filenames[imageIndex] || 'default.png';
}
