/* Description:
 *   Formats Vimeo videos for optimal viewing
 *
 * Dependencies:
 *   none
 *
 * Optional Dependencies:
 *   corsica-reset
 *
 * Author:
 *    momo-the-monster
 */

module.exports = function(corsica) {
  
  // use minimal embedding template from Vimeo
  var template = `<iframe src='https://player.vimeo.com/video/{{id}}?muted=1&autoplay=1&loop={{loop}}&title=0&byline=0&portrait=0' 
                            style='position:absolute;top:0;left:0;width:100%;height:100%;' 
                            frameborder='0' 
                            webkitallowfullscreen 
                            mozallowfullscreen 
                            allowfullscreen></iframe>       
                    <script src='https://player.vimeo.com/api/player.js'></script>
                    <script>
                        var iframe = document.querySelector('iframe');
                        var player = new Vimeo.Player(iframe);

                        //*************************************************************
                        //This section of code strips out the 'blob' portion of the url
                        var url = window.location.href;
                        url = url.substring(5);
                        var index = url.indexOf("/");
                        index = url.indexOf("/", index + 2);
                        url = url.substring(0, index);
                        url += "/reset?id={{name}}";
                        //*************************************************************

                        console.log(url);
                        player.on('ended', function() {
                            var req = new XMLHttpRequest();
                            req.open("GET", url, true);
                            req.send(null);
                        });
                    </script>`;

  // Transform vimeo entries into embeds using id property
  //TODO: transform Vimeo URLs too
  corsica.on('vimeo', function(content) {
    if (content.id === undefined) return;
	
    // replace {{id}} placeholder in template string
    var page = template.replace('{{id}}', content.id);
	
	// replace {{loop}} placeholder in template string. Defaults to true if not provided.
    if (content.loop  === undefined){
      page = page.replace('{{loop}}', '1');
    }else{
      page = page.replace('{{loop}}', content.loop);
    }
	
	// replace {{name}} placeholder in template string
    page = page.replace('{{name}}', content.screen);
    
    // send back page as html content
     corsica.sendMessage('content', {
      type: 'html',
      content: page,
      screen: content.screen
    });
    
    // return content for the sake of other chained plugins
    return content;
  });
  
}