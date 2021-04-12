updateRandom();
var randomizeButton = document.getElementById("randomize");

randomizeButton.addEventListener("click", async () => {
    randomizeButton.classList.add("spinning");
    await updateRandom();
    randomizeButton.classList.remove("spinning");
});

{
    var image = document.getElementById("article-image");
    image.addEventListener("mousemove", (e) => {
        var rect = e.target.getBoundingClientRect();
        var y = (e.clientY - rect.top)
            / e.target.clientHeight;
        var x = (e.clientX - rect.left)
            / e.target.clientHeight;

        image.style.backgroundPosition = `${
            (x < 0.15 ? 0 : (x > 0.85 ? 1 : ( (x - 0.15) / 0.7 ))) * 100
        }% ${
            (y < 0.15 ? 0 : (y > 0.85 ? 1 : ( (y - 0.15) / 0.7 ))) * 100
        }%`;
    });
}