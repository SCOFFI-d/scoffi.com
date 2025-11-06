// baseMediaLoader.js

// Tüm medya dosyalarý için ana URL
const baseURL = "https://raw.githubusercontent.com/SCOFFI-d/scoffi.com/refs/heads/main/Files/";

// Sayfa tamamen yüklendiðinde çalýþsýn
document.addEventListener("DOMContentLoaded", () => {
  // Hem img hem de video yerleri için kullanýlabilir
  const mediaElements = document.querySelectorAll("[data-file]");

  mediaElements.forEach(el => {
    const fileName = el.getAttribute("data-file");
    const fileURL = baseURL + fileName;

    // Uzantýyý belirle
    const extension = fileName.split('.').pop().toLowerCase();

    // Görsel mi video mu karar ver
    const isVideo = ["mp4", "webm", "ogg"].includes(extension);
    const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(extension);

    // Eðer eleman <img> ya da <video> deðilse, uygun olaný oluþtur
    if (!["IMG", "VIDEO"].includes(el.tagName)) {
      const newEl = document.createElement(isVideo ? "video" : "img");

      // Eski elemanýn attribute’larýný kopyala (class, style vs.)
      for (const attr of el.attributes) {
        if (attr.name !== "data-file") {
          newEl.setAttribute(attr.name, attr.value);
        }
      }

      el.replaceWith(newEl); // Eskiyi yenisiyle deðiþtir
      el = newEl; // Referansý güncelle
    }

    // Görsel için:
    if (isImage) {
      el.src = fileURL;
    }

    // Video için:
    if (isVideo) {
      el.src = fileURL;
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.autoplay = false;
    }
  });
});

  document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".showcaseVideo");

    videos.forEach(video => {
      video.addEventListener("mouseenter", () => {
        video.play();
      });

      video.addEventListener("mouseleave", () => {
        video.pause();
      });
	  
	  video.addEventListener("contextmenu", e => {
  e.preventDefault();
	  });
    });
  });
