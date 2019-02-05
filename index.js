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

var fs = require('fs');
var path = require('path');
 
var template = fs.readFileSync(path.join(__dirname,'template.html')).toString();
 
module.exports = function(corsica) {
	
  // Transform vimeo entries into embeds using id property
  // TODO: transform Vimeo URLs too
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