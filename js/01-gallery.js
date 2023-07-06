import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

function renderGallery() {
  const galleryMarkup = galleryItems
    .map(
      item => `
      <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
          />
        </a>
      </li>
    `
    )
    .join('');

  galleryContainer.innerHTML = galleryMarkup;
}

renderGallery();

function handleImageClick(evt) {

  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') return;
  const originalImageUrl = evt.target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${originalImageUrl}" alt="">
  `);
  instance.show();

  const handleKeyDown = evt => {
    if (evt.key === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  document.addEventListener('keydown', handleKeyDown);
}

galleryContainer.addEventListener('click', handleImageClick);

console.log(galleryItems);
