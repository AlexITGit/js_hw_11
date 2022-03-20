import { alert } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";

import "lodash";

import fetchCountry from "../js/fetchCountry";
import markupModal from "../js/markupModal";
import createMarkupLi from "../js/markupLi";

import refs from "../js/refs";

import "../css/style.css";

export { FetchCountries };

class FetchCountries {
  constructor() {
    this.info = [];
    this.searchString = "";
  }

  search = () => {
    if (
      refs.searchRef.value !== "" &&
      refs.searchRef.value !== this.searchString
    ) {
      this.searchString = refs.searchRef.value;
      this.clear();
      fetchCountry().then((data) => {
        this.filter(data);
        this.population(this.info);
        if (this.info.length === 0) {
          alert({
            text: "Ничего не найдено. Уточните поисковый запрос",
            type: "notice",
          });
          refs.searchRef.removeAttribute("disabled");
          refs.loader.style.display = "none";
          return;
        }
        if (this.info.length <= 10) {
          createMarkupLi(this.info);
          if (this.info.length === 1) markupModal(this.info);
          refs.country__click = document.querySelector(".country__ul");
          refs.country__click.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.nodeName === "A") {
              let country = this.info.filter(
                (item) => item.name.official === e.target.innerHTML
              );
              markupModal(country);
            }
          });
          refs.searchRef.removeAttribute("disabled");
          refs.loader.style.display = "none";
          return;
        }
        if (this.info.length > 10) {
          alert({
            text: "Слишком много результатов. Уточните поисковый запрос",
            type: "notice",
          });
          refs.searchRef.removeAttribute("disabled");
          refs.loader.style.display = "none";
          return;
        }
      });
    }
  };

  clear() {
    this.info = [];
    refs.root.innerHTML = "";
  }

  filter(data) {
    data.forEach((el) => {
      let found = false;
      for (const key in el.name.nativeName) {
        if (
          el.name.nativeName[key].official
            .toLowerCase()
            .includes(refs.searchRef.value.toLowerCase()) ||
          el.name.nativeName[key].common
            .toLowerCase()
            .includes(refs.searchRef.value.toLowerCase())
        ) {
          found = true;
        }
        //console.log("nativeNames", el.name.nativeName[key].official);
      }

      if (
        el.name.official
          .toLowerCase()
          .includes(refs.searchRef.value.toLowerCase()) ||
        el.name.common
          .toLowerCase()
          .includes(refs.searchRef.value.toLowerCase())
      ) {
        found = true;
      }
      if (refs.searchRef.value !== "" && found === true) {
        el.population = this.population(el.population);
        this.info.push(el);
      }
    });
  }

  population(int) {
    int = String(Math.trunc(int));
    if (int.length <= 3) return int;
    let space = 0;
    let number = "";

    for (let i = int.length - 1; i >= 0; i--) {
      if (space == 3) {
        number = " " + number;
        space = 0;
      }
      number = int.charAt(i) + number;
      space++;
    }
    return number;
  }

  loadListeners() {
    refs.searchRef.addEventListener("keydown", _.debounce(this.search, 1000));
    //refs.searchRef.addEventListener("mousedown", this.clear);
  }

  init() {
    this.loadListeners();
  }
}
