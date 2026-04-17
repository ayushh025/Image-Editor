let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};
const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    hueRotation: 0,
    blur: 0,
    grayscale: 20,
    sepia: 60,
    opacity: 100,
    invert: 0,
  },

  blackWhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 110,
    contrast: 105,
    saturation: 120,
    hueRotation: 10,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 98,
    contrast: 105,
    saturation: 95,
    hueRotation: 120,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
  dramatic: {
    brightness: 90,
    contrast: 140,
    saturation: 120,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  faded: {
    brightness: 110,
    contrast: 70,
    saturation: 80,
    hueRotation: 0,
    blur: 1,
    grayscale: 20,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  inverted: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 100,
  },

  dreamy: {
    brightness: 120,
    contrast: 80,
    saturation: 110,
    hueRotation: 0,
    blur: 3,
    grayscale: 10,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },
};

const filtersCon = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const placeholder = document.querySelector(".placeholder");
const resetbtn = document.querySelector("#reset-btn");
const downloadbtn = document.querySelector("#download-btn");
const presetsCon = document.querySelector(".presets");
let imgFile = null;
let loadedImg = null;

imageInput.addEventListener("change", (e) => {
  imgFile = e.target.files[0];
  const image = new Image();

  image.src = URL.createObjectURL(imgFile);

  image.onload = () => {
    loadedImg = image;
    imageCanvas.style.display = "block";
    placeholder.style.display = "none";
    imageCanvas.width = image.width;
    imageCanvas.height = image.height;
    canvasCtx.drawImage(image, 0, 0);
  };
});

resetbtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  applyFilters();
  createFilter();
});

createFilter();

downloadbtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

Object.keys(presets).forEach((val) => {
  const btn = document.createElement("button");
  btn.textContent = val;
  btn.classList.add("btn");

  presetsCon.append(btn);

  btn.addEventListener("click", () => {
    Object.keys(presets[val]).forEach((filter) => {
      filters[filter].value = presets[val][filter];
    });
    createFilter();
    applyFilters();
  });
});

function createFilter() {
  filtersCon.innerHTML = "";
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max
    );
    filtersCon.append(filterElement);
  });
}

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  input.addEventListener("input", () => {
    filters[name].value = input.value;
    applyFilters();
  });

  const p = document.createElement("p");
  p.textContent = name;

  div.append(p, input);

  return div;
}

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  invert(${filters.invert.value}${filters.invert.unit})`;

  canvasCtx.drawImage(loadedImg, 0, 0);
}