(function () {
  var overlay = null;

  function ensureOverlay() {
    if (overlay) {
      return overlay;
    }
    overlay = document.createElement("div");
    overlay.className = "artwork-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Artwork full view");
    overlay.innerHTML =
      '<button type="button" class="artwork-lightbox-close" aria-label="Close full screen view">&times;</button>' +
      '<img class="artwork-lightbox-img" alt="">';

    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector(".artwork-lightbox-img");
    overlay.querySelector(".artwork-lightbox-close").addEventListener("click", close);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        close();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        close();
      }
    });

    imgEl.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    return overlay;
  }

  function open(src, alt) {
    var el = ensureOverlay();
    var imgEl = el.querySelector(".artwork-lightbox-img");
    imgEl.src = src;
    imgEl.alt = alt || "";
    el.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    if (!overlay || !overlay.classList.contains("is-open")) {
      return;
    }
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    var imgEl = overlay.querySelector(".artwork-lightbox-img");
    imgEl.removeAttribute("src");
    imgEl.alt = "";
  }

  document.querySelectorAll(".artwork-card img.artwork-image").forEach(function (img) {
    var parentLink = img.closest("a");
    var opensHtmlPage = parentLink && /\.html($|#|\?)/.test(parentLink.getAttribute("href") || "");

    if (opensHtmlPage) {
      img.style.cursor = "pointer";
      return;
    }

    img.style.cursor = "zoom-in";
    img.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      open(img.currentSrc || img.src, img.alt);
    });
  });
})();
