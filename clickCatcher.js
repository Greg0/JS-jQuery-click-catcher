var catchClick = {
	
    path: false,
    links: {},
    actions: {},
    loader: '<center><img src="/fluid/media/img/ajax-loader.gif" alt="" /></center>',  
        
    init: function()
    {
        $('a').live('click',function()
        {
            var adress = $(this).attr('href'),
            title = $(this).attr('title'),
            checked = catchClick.check(adress);
            
            if(checked !== undefined)
            {
                catchClick.showDialog(adress, title, checked);
                return false;
            }
            else
                return true;
            
        });
        
        $('#box a').live('click', function()
        {
            var adress = $(this).attr('href'),
            title = $(this).attr('title'),
            checked = catchClick.check(adress);
            
            if(checked !== undefined)
            {
                catchClick.changeDialog(adress, title, checked);
                return false;
            }
            else
                return true;
        });
    },
	
    getPath: function()
    {
        var dir = window.location.pathname;
        var regex = /(\/[a-zA-Z0-9_]*\/)/;
        
        return (this.path) ?
        dir.match(regex)[0] :
        '/';
    },
    
    check: function(adress)
    {
        var pos = this.links;
        var get = new Array();
        $.each(pos, function(i){
            $.each(pos[i], function(n){
                var SearchTerm = new RegExp(pos[i][n],'i');
                if(adress.match(SearchTerm))
                {
                    get.push(i);
                }
                else
                {
                    return true;
                }
            });
        });
        return get[get.length-1];

    //        return jQuery.inArray(adress,this.links);
    },
	
    showDialog: function(file, title, buttons)
    {
        title = typeof(title) != 'undefined' ? title : 'Domyślny tytuł';
        var box = $('<div id="box" style="display:none" title="'+title+'"></div>').appendTo('body');
        var dialogOpts = {
            modal: true,
            autoOpen: false,
            draggable: false,
            resizable: false,
            buttons: this.actions[buttons],
            width: 450,
            position: ['center', 200],
            close: function()
            {
              
                box.dialog('destroy').remove();
                
            },

            open: function() {
                //display correct dialog content
                box.load(file);
            }
        };
        box.dialog(dialogOpts);	//end dialog
	
        box.html(this.loader)
        box.dialog("open");
    
    //  $('#content > div').load(file);
    },
    
    changeDialog: function(file, title, buttons)
    {
        var box = $("#box");
        var dialogOpts = {
            buttons: this.actions[buttons]
        };
        box.dialog(dialogOpts);	//end dialog
        $('#ui-dialog-title-box').html(title);
        box.html(this.loader);
        box.load(file);
    },
    
    closeDialog: function()
    {
        var box = $("#box");
        box.dialog('destroy').remove();
    },
    
    cutUrl: function() {
        
        return slice(0, -1);
        
    }

};

$(document).ready(function() {

    catchClick.path = true;
    
    catchClick.links = {
        
        add : [
        catchClick.getPath()+'admin/building/add$',
        catchClick.getPath()+'admin/company/add$',
        ],
        
        edit : [
        catchClick.getPath()+'admin/building/edit/[0-9]+',
        catchClick.getPath()+'admin/company/edit/[0-9]+',
        ],
    
        del : [
        catchClick.getPath()+'admin/building/delete/[0-9]+',
        catchClick.getPath()+'admin/company/delete/[0-9]+',
        ]
    
    };
    

    catchClick.init();
    
    
    catchClick.actions = {
    
        add : 
        {
            'Save': function() {
                $('#box_form').submit();
            }
        },
    
        edit :
        { 
            'Save': function() {
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

});
