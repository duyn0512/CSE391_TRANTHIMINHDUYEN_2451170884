const images = [
    { id: 1, title: "Núi Phú Sĩ Thơ Mộng", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=60" },
    { id: 2, title: "Thành Phố Tokyo Lên Đèn", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=60" },
    { id: 3, title: "Rừng Tre Sagano Xanh Mướt", url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60" },
    { id: 4, title: "Cổng Trời Torii Huyền Bí", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80" },
    { id: 5, title: "Cố Đô Kyoto Cổ Kính", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=70" },
    { id: 6, title: "Tháp Cảng Kobe Rực Rỡ", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=50" }
];

const commands = [
    { id: "play-slideshow", text: "Slideshow: Bật / Tắt Tự động chạy", shortcut: "Space", action: () => toggleSlideshow() },
    { id: "theme-light", text: "Giao diện: Chuyển sang Nền Sáng (Mặc định)", shortcut: "", action: () => changeTheme("light") },
    { id: "theme-sepia", text: "Giao diện: Chuyển sang Nền Hoài Cổ (Sepia)", shortcut: "", action: () => changeTheme("sepia") },
    { id: "theme-dark", text: "Giao diện: Chuyển sang Nền Tối (Dark)", shortcut: "", action: () => changeTheme("dark") },
    { id: "view-first", text: "Điều hướng: Nhảy nhanh tới ảnh đầu tiên", shortcut: "Phím 1", action: () => selectImage(0) },
    { id: "view-last", text: "Điều hướng: Nhảy nhanh tới ảnh cuối cùng", shortcut: `Phím ${images.length}`, action: () => selectImage(images.length - 1) }
];

let currentIndex = 0;
let slideshowInterval = null;
let filteredCommands = [...commands];
let selectedCommandIndex = 0;

const mainImage = document.getElementById("mainImage");
const thumbnailsGrid = document.getElementById("thumbnailsGrid");
const slideshowBadge = document.getElementById("slideshowBadge");
const commandPalette = document.getElementById("commandPalette");
const paletteInput = document.getElementById("paletteInput");
const commandList = document.getElementById("commandList");

function initGallery() {
    thumbnailsGrid.innerHTML = "";
    
    images.forEach((img, index) => {
        const btn = document.createElement("button");
        btn.className = `thumb-btn ${index === currentIndex ? 'active' : ''}`;
        
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-label", `Xem ảnh ${index + 1}: ${img.title}`);
        btn.setAttribute("aria-selected", index === currentIndex ? "true" : "false");
        
        btn.innerHTML = `
            <img src="${img.url}" alt="${img.title}">
            <span class="thumb-number" aria-hidden="true">${index + 1}</span>
        `;
        
        btn.addEventListener("click", () => {
            selectImage(index);
            stopSlideshow(); 
        });
        
        thumbnailsGrid.appendChild(btn);
    });

    updateMainView();
}

function updateMainView() {
    const currentImg = images[currentIndex];
    mainImage.src = currentImg.url;
    mainImage.alt = currentImg.title;

    const thumbs = thumbnailsGrid.querySelectorAll(".thumb-btn");
    thumbs.forEach((thumb, idx) => {
        if (idx === currentIndex) {
            thumb.classList.add("active");
            thumb.setAttribute("aria-selected", "true");
        } else {
            thumb.classList.remove("active");
            thumb.setAttribute("aria-selected", "false");
        }
    });
}

function selectImage(index) {
    if (index >= 0 && index < images.length) {
        currentIndex = index;
        updateMainView();
    }
}

function toggleSlideshow() {
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        slideshowBadge.textContent = "Slideshow: Đang chạy ⏳";
        slideshowBadge.style.backgroundColor = "#16a34a";
        slideshowInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateMainView();
        }, 2000); 
    }
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        slideshowBadge.textContent = "Slideshow: Tắt";
        slideshowBadge.style.backgroundColor = "rgba(0,0,0,0.75)";
    }
}

function changeTheme(theme) {
    document.body.classList.remove("sepia-theme", "dark-theme");
    if (theme === "sepia") document.body.classList.add("sepia-theme");
    if (theme === "dark") document.body.classList.add("dark-theme");
}

function openCommandPalette() {
    stopSlideshow();
    commandPalette.classList.add("active");
    commandPalette.setAttribute("aria-hidden", "false");
    paletteInput.value = "";
    renderCommandList(commands);
    paletteInput.focus(); 
}

function closeCommandPalette() {
    commandPalette.classList.remove("active");
    commandPalette.setAttribute("aria-hidden", "true");
    paletteInput.blur();
}

function renderCommandList(list) {
    commandList.innerHTML = "";
    filteredCommands = list;
    
    if (list.length === 0) {
        const noResult = document.createElement("li");
        noResult.className = "command-item";
        noResult.style.color = "#94a3b8";
        noResult.textContent = "Không tìm thấy lệnh nào phù hợp...";
        commandList.appendChild(noResult);
        return;
    }

    list.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.className = `command-item ${idx === selectedCommandIndex ? 'selected' : ''}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", idx === selectedCommandIndex ? "true" : "false");
        
        li.innerHTML = `
            <span>${cmd.text}</span>
            ${cmd.shortcut ? `<span class="command-shortcut"><kbd>${cmd.shortcut}</kbd></span>` : ""}
        `;
        
        li.addEventListener("click", () => {
            cmd.action();
            closeCommandPalette();
        });
        
        commandList.appendChild(li);
    });
}

paletteInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const result = commands.filter(cmd => cmd.text.toLowerCase().includes(keyword));
    selectedCommandIndex = 0; 
});

document.addEventListener("keydown", (e) => {
    const isPaletteOpen = commandPalette.classList.contains("active");

    if (isPaletteOpen) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeCommandPalette();
        } 
        else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (filteredCommands.length > 0) {
                selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
                renderCommandList(filteredCommands);
            }
        } 
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (filteredCommands.length > 0) {
                selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
                renderCommandList(filteredCommands);
            }
        } 
        else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredCommands.length > 0 && filteredCommands[selectedCommandIndex]) {
                filteredCommands[selectedCommandIndex].action();
                closeCommandPalette();
            }
        }
        return;
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCommandPalette();
        return;
    }

    if (e.key === " " || e.key === "Spacebar") {
        if (document.activeElement !== paletteInput) {
            e.preventDefault(); 
        }
    }

    if (e.key === "ArrowLeft") {
        e.preventDefault();
        stopSlideshow();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateMainView();
    } 
    else if (e.key === "ArrowRight") {
        e.preventDefault();
        stopSlideshow();
        currentIndex = (currentIndex + 1) % images.length;
        updateMainView();
    }

    if (e.key >= "1" && e.key <= "9") {
        const targetIndex = parseInt(e.key) - 1;
        if (targetIndex < images.length) {
            e.preventDefault();
            stopSlideshow();
            selectImage(targetIndex);
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    initGallery();
});