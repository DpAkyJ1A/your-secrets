export default function getBooleanIcon(bool) {
  if (bool) 
    return `<ion-icon name="checkmark-circle-outline" class="card__success boolean-icon"></ion-icon>`;
  return `<ion-icon name="close-circle-outline" class="card__error boolean-icon"></ion-icon>`;
}