export function getBooleanIcon(bool) {
  if (bool) 
    return `<ion-icon name="checkmark-circle-outline" class="card__success boolean-icon"></ion-icon>`;
  return `<ion-icon name="close-circle-outline" class="card__error boolean-icon"></ion-icon>`;
}

export function getHTML(data) {
  if (data)
    return `<span>${data}</span>`;
  return `<span class="card__error">&#8212</span>`;
}