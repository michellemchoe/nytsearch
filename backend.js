var apiKey = "60c19494308449949406c01e1fd12531";

function run(q, startYear, endYear)
{
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': apiKey,
        'q': q
    });
    if (startYear)
        url += "&begin_date=" + startYear + "0101";
    if (endYear)
        url += "&end_date=" + endYear + "1231";

    $.ajax({
        url: url,
        method: 'GET',
    }).then(parseResults);
}

var count = 5;
function parseResults(res)
{
    $("#topArticlesContent").empty();

    var docs = res.response.docs;
    for (var i = 0; i < count; i++)
    {
        var url = docs[i].web_url;
        var headline = docs[i].headline.main;
        console.log(url, headline);

        var div = $("<div>").addClass("content");
        var a = $("<a>").text(headline);
        a.attr("href", url);
        a.attr("target", "_blank");
        div.append(a);
        $("#topArticlesContent").append(div);
    }
}

$("#oneRecord").on("click", function() {
    count = 1;
    $("#recordCountLabel").text(count);
});
$("#fiveRecord").on("click", function() {
    count = 5;
    $("#recordCountLabel").text(count);
});
$("#tenRecords").on("click", function() {
    count = 10;
    $("#recordCountLabel").text(count);
});

$("#submitButton").on("click", function() {
    var q = $("#searchTerm").val();
    var start = $("#startYear").val();
    var end = $("#endYear").val();
    run(q, start, end);
});

$("#clearResultsButton").on("click", function() {
    $("#topArticlesContent").empty();
});