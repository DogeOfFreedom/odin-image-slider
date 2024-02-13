import "../style.css";
import img1 from "../images/20230220_005329.jpg";
import img2 from "../images/20230220_005438.jpg";
import img3 from "../images/20230220_005518.jpg";
import img4 from "../images/20230220_092720.jpg";
import img5 from "../images/20230221_014827.jpg";
import img6 from "../images/20230323_190955.jpg";

const imageSrcs = [img1, img2, img3, img4, img5, img6];
const imageCarousel = document.querySelector(".image-carousel");
const imageNav = document.querySelector(".image-nav");
const imageLength = 800;
const numImages = imageSrcs.length;
let currentLocation = 0;

const changeImgOpacities = (id) => {
  // Set all images to opaque
  const imgs = document.querySelectorAll(".image-carousel img");
  imgs.forEach((img) => {
    // eslint-disable-next-line no-param-reassign
    img.className = "unfocused-image";
  });

  const navImgs = document.querySelectorAll(".image-nav img");
  navImgs.forEach((navImg) => {
    // eslint-disable-next-line no-param-reassign
    navImg.className = "unfocused-image";
  });

  // Fully show focused image
  const img = document.querySelector(`#image${id}`);
  img.classList.remove("unfocused-image");

  const navImg = document.querySelector(`.image-nav img[value="${id}"]`);
  navImg.classList.remove("unfocused-image");
};

const moveToSelectedImg = (id) => {
  const otherNavImgs = document.querySelectorAll(".image-nav img");
  otherNavImgs.forEach((img) => {
    img.setAttribute("data-selected", "false");
  });

  const selectedNavImg = document.querySelector(
    `.image-nav img[value="${id}"]`,
  );
  selectedNavImg.setAttribute("data-selected", "true");
  imageCarousel.style.transform = `translate(${-imageLength * (id - 1)}px)`;
  changeImgOpacities(id);
};

let count = 1;
imageSrcs.forEach((imageSrc) => {
  const id = `image${count}`;
  const carouselImage = document.createElement("img");
  carouselImage.src = imageSrc;
  carouselImage.id = id;
  imageCarousel.appendChild(carouselImage);

  const navImage = document.createElement("img");
  navImage.src = imageSrc;
  navImage.setAttribute("value", count);
  navImage.setAttribute("data-selected", "false");
  navImage.addEventListener("click", () => {
    moveToSelectedImg(navImage.getAttribute("value"));
  });
  imageNav.appendChild(navImage);

  count += 1;
});

let index = 1;
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
prevBtn.addEventListener("click", () => {
  currentLocation += imageLength;
  imageCarousel.style.transform = `translate(${currentLocation}px)`;

  // Current Img
  if (index === numImages) {
    nextBtn.classList.remove("hidden");
  }
  index -= 1;

  // Next Image
  if (index === 1) {
    prevBtn.classList.add("hidden");
  }
  changeImgOpacities(index);
});

nextBtn.addEventListener("click", () => {
  currentLocation -= imageLength;
  imageCarousel.style.transform = `translate(${currentLocation}px)`;

  // Current Img
  if (index === 1) {
    prevBtn.classList.remove("hidden");
  }
  index += 1;

  // Next Img
  if (index === numImages) {
    nextBtn.classList.add("hidden");
  }
  changeImgOpacities(index);
});

changeImgOpacities(index);
