import countryTemplateLi from "../templates/countries.handlebars";
import refs from "../js/refs";

function createMarkupLi(items) {
  let markup = countryTemplateLi(items);
  refs.root.insertAdjacentHTML("beforeend", markup);
}

export default createMarkupLi;
