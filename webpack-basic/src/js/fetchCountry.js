import { alert } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";

import loading from "../templates/loading.handlebars";
import refs from "../js/refs";

function fetchCountry() {
  let URL = `https://restcountries.com/v3.1/all`;

  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };
  refs.root.insertAdjacentHTML("beforeend", loading());
  refs.loader = document.querySelector(".wrapper");
  refs.searchRef.setAttribute("disabled", true);
  return fetch(URL, options)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      alert({
        text: `Ошибка промиса: ${err}`,
        type: "notice",
      });
      refs.searchRef.removeAttribute("disabled");
      refs.loader.style.display = "none";
    });
}

export default fetchCountry;
