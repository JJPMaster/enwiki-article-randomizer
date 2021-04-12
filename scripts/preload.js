async function getRandom() {
    if (type !== "ga" && type !== "fa")
        throw "bruh";
    var article = await (await fetch(`../get-article.php${type === "ga" ? "?good" : ""}`)).text();
    return await (await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${article.replace(/ /g, "_")}`
    )).json();
}

var current;
async function updateRandom() {
    current = await getRandom();

    document.getElementById("article-title").innerHTML = current["titles"]["display"];
    if (current["description"] != null) {
        var subtitle = document.getElementById("article-subtitle");
        subtitle.style.display = "block";
        subtitle.innerHTML = current["description"];
    } else {
        document.getElementById("article-subtitle").style.display = "none";
    }

    {
        var image = document.getElementById("article-image");
        if (current["originalimage"] != null) {
            image.style.backgroundImage = 
                `url("${current["originalimage"]["source"]}")`;
        } else {
            image.style.backgroundImage = null;
        }
        image.style.backgroundPosition = null;
        image.setAttribute("href", current["content_urls"]["desktop"]["page"]);
    }

    document.getElementById("article-description").innerHTML = 
        current["extract_html"].replace(/^<p>(.*)<\/p>$/i, "$1");

    {
        var loadBlock = document.getElementById("article-hide");
        if (loadBlock != null) {
            loadBlock.parentElement.removeChild(loadBlock);
        }
    }
}