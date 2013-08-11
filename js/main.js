var base_str = '<li class="entry"><ul><li><p><span>{artistName} : <a href="{trackViewUrl}">{trackName}</a></span></p></li><li><iframe src="{previewUrl}" width="400" height="80"></iframe></li></ul></li>';
$(function(){
  $.ajax({
    url      : 'https://itunes.apple.com/search?term=jack+johnson&limit=5&entity=musicVideo&country=jp',
    dataType : 'JSONP',
    success  : function(data) {
      console.log("Success:",data);
      var entries = data.results;
      var len = entries.length;
      for(var i=0;i<len;i++){
        $('ol#results').append(
            base_str
                .replace('{artistName}', entries[i].artistName)
                .replace('{trackName}', entries[i].trackName)
                .replace('{trackViewUrl}', entries[i].trackViewUrl)
                .replace('{previewUrl}', entries[i].previewUrl)
        );
      }
    },
    error    : function(err) {
      console.log("Error:", err);
    }
  });
});
