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
  imageNav.appendChild(navImage);

  count += 1;
});

const imageLength = 800;
let currentLocation = 0;

const numImages = imageSrcs.length;

let index = 1;
const changeImgOpacities = () => {
  // Set all images to opaque
  const imgs = document.querySelectorAll(".image-carousel img");
  imgs.forEach((img) => {
    // eslint-disable-next-line no-param-reassign
    img.className = "unfocused-image";
  });

  // Fully show focused image
  const img = document.querySelector(`#image${index}`);
  img.classList.remove("unfocused-image");
};

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
  changeImgOpacities();
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
  changeImgOpacities();
});

changeImgOpacities();
