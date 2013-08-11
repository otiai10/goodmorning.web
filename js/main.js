
var base_str = '<li><div class="entry"><iframe src="{url}" width="300" height="80"></iframe></div></li>';
$(function(){
  $.ajax({
    url      : 'https://itunes.apple.com/search?term=jack+johnson&limit=5',
    dataType : 'JSONP',
    success  : function(data) {
      console.log("Success:",data);
      var entries = data.results;
      var len = entries.length;
      for(var i=0;i<len;i++){
        $('ol#results').append(base_str.replace('{url}', entries[i].previewUrl));
      }
    },
    error    : function(err) {
      console.log("Error:",err);
    },
  });
});
