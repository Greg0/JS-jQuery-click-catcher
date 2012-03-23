[jQuery][UI dialog] click catcher
=============

JS Class to catch clicks on defined link and open dialog with page


Usage
------

If your website is in subfolder on server you have to define `path` to `true` to detect path of your site.

To define URLs you want to open in UI dialog you must define an array `links` with links divided to categories. For example:

        catchClick.links = {
        
         add : [
          catchClick.getPath()+'admin/user/add$',
          catchClick.getPath()+'admin/news/add$',
         ],
         
         edit : [
          catchClick.getPath()+'admin/user/edit/[0-9]+',
          catchClick.getPath()+'admin/news/edit/[0-9]+',
         ],
     
         del : [
          catchClick.getPath()+'admin/user/delete/[0-9]+',
          catchClick.getPath()+'admin/news/delete/[0-9]+',
         ]
    
      };

function `getPath()` must be added before URL even if your website is in root path

Next you must to define button set for each category (it's an object with buttons from UI dialog):

     catchClick.actions = {
    
        add : 
        {
            'Add': function() {
                $('#box_form').submit();
            }
        },
    
        edit :
        { 
            'Edit': function() {
                $('#box_form').submit();
            }
        },
    
        del :
        { 
            'Yes': function() {
                $('#box_form').submit();
            },
            'No': function() {
                catchClick.closeDialog();
            }
        }
    
     }

And finally call `init()` function

Description
------

That's all for now, I think it is possible to write something else in future ;)

My homepage: <http://greg0.ovh.org>

