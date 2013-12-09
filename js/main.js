var base_str = '<li class="entry">'
              +'  <ul>'
              +'    <li><p><span>{artistName} : <a href="{trackViewUrl}" target="_blank">{trackName}</a></span></p></li>'
              +'    <li><audio src="{previewUrl}" controls preload></audio><img src="{artworkUrl100}"></li>'
              +'  </ul>'
              +'</li>';

var replaceResults = function(data) {
  console.log("Success:",data);
  var entries = data.results;
  var len = entries.length;
  $('ol#results').html('');
  if (len == 0) return notFound();
  for(var i=0;i<len;i++){
    $('ol#results').append(
        base_str
            .replace('{artistName}', entries[i].artistName)
            .replace('{trackName}', entries[i].trackName)
            .replace('{trackViewUrl}', entries[i].trackViewUrl)
            .replace('{previewUrl}', entries[i].previewUrl)
            .replace('{artworkUrl100}', entries[i].artworkUrl100)
    );
  }
};
var notFound = function(){
  $('ol#results').append('<li>Not Found...</li>');
};
var disableSearchArea = function(keyword){
  $("#search").val(keyword).attr("disabled",true);
  $("#execute-search").attr("disabled",true);
  $("<img>").attr({
    id   : 'loader',
    src  : 'src/img/ajax-loader.gif',
    width: '20px'
  }).appendTo("#search-area");
};
var recoverSearchArea = function(){
  $("#search").removeAttr("disabled");
  $("#execute-search").removeAttr("disabled");
  $("#loader").remove();
};

var executeSearch = function(keyword, cb, opt) {
  var opt = {limit:5};
  disableSearchArea(keyword);
  $.ajax({
    type     : 'GET',
    url      : 'https://itunes.apple.com/search',
    data     : "term=" + encodeURIComponent(keyword) + "&country=jp&limit=" + opt.limit,
    dataType : 'JSONP',
    success  : function(data) {
      recoverSearchArea();
      cb(data);
    },
    error    : function(err) {
      console.log("Error:", err);
    }
  });
};

$(function(){
  executeSearch("アイカツ", replaceResults);

  $("#execute-search").on('click',function(ev){
    var keyword = $("#search").val();
    if(keyword){
      executeSearch(keyword, replaceResults);
      alert(keyword);
    }
  });
});
