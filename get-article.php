<?php
header("Content-Type: text/plain");

$type = "Featured";


$headers = get_headers(
    "https://en.uncyclopedia.co/wiki/Special:RandomInCategory/" . $type
);

foreach ($headers as $header) {
    if (substr(strtolower($header), 0, 8) == "location") {
        exit(str_replace(
            "_",
            " ",
            preg_replace(
                "#Location:\s*https?:\/\/en\.uncyclopedia\.co\/wiki\/#i",
                "",
                $header
            )
        ));
    }
}

http_response_code(404);
exit("[[null]]");
