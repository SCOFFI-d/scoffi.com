// essentials.js

const baseURL = "https://raw.githubusercontent.com/SCOFFI-d/scoffi.com/refs/heads/main/Files/";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Medya Yükleyici (data-file iþleme)
    const mediaElements = document.querySelectorAll("[data-file]");
    mediaElements.forEach(el => {
        const fileName = el.getAttribute("data-file");
        const fileURL = baseURL + fileName;
        const extension = fileName.split('.').pop().toLowerCase();
        const isVideo = ["mp4", "webm", "ogg"].includes(extension);

        if (!["IMG", "VIDEO"].includes(el.tagName)) {
            const newEl = document.createElement(isVideo ? "video" : "img");
            for (const attr of el.attributes) {
                if (attr.name !== "data-file") newEl.setAttribute(attr.name, attr.value);
            }
            el.replaceWith(newEl);
            el = newEl;
        }

        el.src = fileURL;
        if (isVideo) {
            el.muted = true;
            el.loop = true;
            el.playsInline = true;
            el.autoplay = false;
        }
    });

    // 2. Hover Oynatma ve Sað Týk Engeli
    const videos = document.querySelectorAll(".showcaseVideo, .content");
    videos.forEach(video => {
        video.addEventListener("mouseenter", () => video.play());
        video.addEventListener("mouseleave", () => video.pause());
        video.addEventListener("contextmenu", e => e.preventDefault());
    });

    // 3. Aktif Menü Butonu Belirleme
    const buttons = document.querySelectorAll(".upperButton");
    const currentPage = window.location.pathname.split("/").pop();
    buttons.forEach(btn => {
        const href = btn.getAttribute("href");
        if (href === currentPage || (href === "index.html" && currentPage === "")) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // 4. LIGHTBOX (Tam Ekran Modu)
    let overlay = document.querySelector(".lightbox-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";
        overlay.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-container"></div>
            <button class="lightbox-mute" style="display:none;">Sesi Aç</button>
        `;
        document.body.appendChild(overlay);
    }

    const container = overlay.querySelector(".lightbox-container");
    const muteBtn = overlay.querySelector(".lightbox-mute");

    document.body.addEventListener("click", (e) => {
        const target = e.target.closest("[data-file]");
        if (!target) return;

        const isVideo = target.tagName === "VIDEO";
        const source = target.src;

        container.innerHTML = "";
        let media;

        if (isVideo) {
            media = document.createElement("video");
            media.src = source;
            media.autoplay = true;
            media.loop = true;
            media.muted = false;
            muteBtn.style.display = "block";
            muteBtn.textContent = "Sesi Kapat";
        } else {
            media = document.createElement("img");
            media.src = source;
            muteBtn.style.display = "none";
        }

        media.className = "lightbox-content";
        container.appendChild(media);
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";

        muteBtn.onclick = (event) => {
            event.stopPropagation();
            media.muted = !media.muted;
            muteBtn.textContent = media.muted ? "Sesi Aç" : "Sesi Kapat";
        };
    });

    const closeLightbox = () => {
        overlay.style.display = "none";
        container.innerHTML = "";
        document.body.style.overflow = "auto";
    };

    overlay.querySelector(".lightbox-close").onclick = closeLightbox;
    overlay.onclick = (e) => { if (e.target === overlay) closeLightbox(); };
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
});