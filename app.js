(() => {
  const slider = document.querySelector(".slider");
  const dotsContainer = document.querySelector(".dots-container");

  const fetchListOfImages = async () => {
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=5",
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (result && result.length > 0) displayImages(result);
    } catch (e) {
      console.log(error);
    }
  };

  const displayImages = (result) => {
    slider.innerHTML = result
      .map(
        (imageItem, index) => `
        <div class="slide">
        <img src=${imageItem.download_url} alt=${imageItem.id} />
        </div>
    `
      )
      .join(" ");

    dotsContainer.innerHTML = result
      .map(
        (item, index) => `
    <span class="dot ${index === 0 ? "active" : ""}" data-slide=${index}></span>
`
      )
      .join(" ");
  };

  setTimeout(() => {
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");
    const slides = document.querySelectorAll(".slide");
    let currIndex = 0;

    const activeDot = (slide) => {
      document.querySelectorAll(".dot").forEach((dotItem) => {
        dotItem.classList.remove("active");
      });

      document
        .querySelector(`.dot[data-slide="${slide}"]`)
        .classList.add("active");
    };

    const changeCurrentSlide = (slide) => {
      slides.forEach(
        (slideItem, index) =>
          (slideItem.style.transform = `translateX(${100 * (index - slide)}%)`)
      );
    };

    btnPrev.addEventListener("click", () => {
      currIndex--;
      if (currIndex < 0) {
        currIndex = slides.length - 1;
      }

      changeCurrentSlide(currIndex);
    });

    btnNext.addEventListener("click", () => {
      currIndex++;
      if (currIndex > slides.length - 1) {
        currIndex = 0;
      }

      changeCurrentSlide(currIndex);
    });

    dotsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("dot")) {
        const currentSlideIndex = event.target.dataset.slide;
        changeCurrentSlide(currentSlideIndex);
        activeDot(currentSlideIndex);
      }
    });
  }, 1000);

  fetchListOfImages();
})();
