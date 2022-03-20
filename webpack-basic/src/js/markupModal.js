import * as basicLightbox from "basiclightbox";
import "basicLightbox/dist/basicLightbox.min.css";
import modalTemplate from "../templates/country.handlebars";

function markupModal(items) {
  let markup = modalTemplate(items);
  basicLightbox.create(markup).show();
}

export default markupModal;
