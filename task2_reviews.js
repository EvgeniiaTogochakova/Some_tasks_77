const divContainerEl = document.querySelector("div.container");

initialData.forEach((product) => {
  const newArticleEl = document.createElement("article");
  divContainerEl.append(newArticleEl);
  newArticleEl.insertAdjacentHTML(
    "beforeend",
    `<h2 class="product_name">${product.product}</h2>`
  );
  newArticleEl.insertAdjacentHTML(
    "beforeend",
    `<button class="add_review">Добавить отзыв</button>`
  );
  product.reviews.forEach((review) => {
    newArticleEl.insertAdjacentHTML(
      "beforeend",
      `<textarea class="review" cols="25" rows="4" readonly>${review.text}</textarea>`
    );
  });
});

const buttonEls = document.querySelectorAll("button.add_review");

buttonEls.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("clicked");
    button.disabled = true;
    const newReviewEl = document.createElement("textarea");
    newReviewEl.classList.add("review");
    newReviewEl.setAttribute("cols", 25);
    newReviewEl.setAttribute("rows", 4);
    const closest_article = button.closest("article");
    closest_article.append(newReviewEl);
    const newButtonEl = document.createElement("button");
    newButtonEl.classList.add("send");
    newButtonEl.textContent = "Отправить отзыв на модерацию";
    closest_article.append(newButtonEl);

    newButtonEl.addEventListener("click", () => {
      try {
        if (newReviewEl.value.length < 50 || newReviewEl.value.length > 500) {
          throw new Error(
            "Длина отзыва допускается только от 50 до 500 символов"
          );
        }
        newButtonEl.disabled = true;
        const newApproval = document.createElement("div");
        newApproval.classList.add("notice");
        newApproval.textContent = "Ваш отзыв на модерации";
        closest_article.append(newApproval);
        setTimeout(() => {
          newButtonEl.remove();
          newReviewEl.style.display = "none";
        }, 2000);
        button.disabled = false;
        button.classList.remove("clicked");
        setTimeout(() => {
          try {
            if (Math.random() < 0.8) {
              newReviewEl.style.display = "block";
              newReviewEl.setAttribute("readonly", "true");
              newApproval.textContent = "Ваш отзыв опубликован, поздравляем!";
            } else {
              newReviewEl.remove();
              newApproval.textContent =
                "К сожалению, Ваш отзыв не прошел модерацию";
            }
          } finally {
            newButtonEl.disabled = false;
            setTimeout(() => {
              newApproval.textContent = "";
            }, 5000);
          }
        }, 5000);
      } catch (error) {
        const newWarning = document.createElement("div");
        newWarning.classList.add("notice");
        newWarning.textContent = `${error.message}, у вас ${newReviewEl.value.length}`;
        setTimeout(() => {
          newWarning.textContent = "";
        }, 1000);
        closest_article.append(newWarning);

        newReviewEl.addEventListener("input", () => {
          newWarning.remove();
        });
      }
    });
  });
});
