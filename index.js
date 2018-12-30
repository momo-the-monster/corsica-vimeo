/* Description:
 *   Formats Vimeo videos for optimal viewing
 *
 * Dependencies:
 *   none
 *
 * Author:
 *    momo-the-monster
 */

module.exports = function(corsica) {
  
  // use minimal embedding template from Vimeo
  var template = "<iframe src='https://player.vimeo.com/video/{{id}}?muted=1&autoplay=1&loop=1&title=0&byline=0&portrait=0' style='position:absolute;top:0;left:0;width:100%;height:100%;' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><script src='https://player.vimeo.com/api/player.js'></script>";

  // Transform vimeo entries into embeds using id property
  //TODO: transform Vimeo URLs too
  //TODO: check for id property and exit early if missing
  corsica.on('vimeo', function(content) {
    
    // replace {{id}} placeholder in template string
    var page = template.replace('{{id}}', content.id);
    
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