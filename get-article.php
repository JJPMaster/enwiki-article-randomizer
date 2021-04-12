<?php
header("Content-Type: text/plain");

$type = "Featured";
if (isset($_GET["good"]))
    $type = "Good";

$headers = get_headers(
    "https://en.wikipedia.org/wiki/Special:RandomInCategory/" . $type . "_articles"
);

foreach ($headers as $header) {
    if (substr(strtolower($header), 0, 8) == "location") {
        exit(str_replace(
            "_",
            " ",
            preg_replace(
                "#Location:\s*https?:\/\/en\.wikipedia\.org\/wiki\/#i",
                "",
                $header
            )
        ));
    }
}

http_response_code(404);
exit("[[null]]");