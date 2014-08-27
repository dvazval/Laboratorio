$(document).ready(function(){
	Parse.initialize("KQ46uP4jeqQx4fI5WpukTp1LzwJcDSXoBrtGCr5S","6zAdel7CoK4UAUEDaQJ1p8dJtrbRGPXFiZWGx0KU");

	var jContacto = Parse.Object.extend("Contacto");
	var query = new Parse.Query(jContacto);
	var file;
	
	
	
	query.find({
		success: function(list) {
			var p = "";
			for ( var i = 0; i < list.length; i++ ) {
				var item = list[i];
				
				p += '<li class="list-group-item">'
				p += 	'<div class="col-xs-12 col-sm-3">'
				p +=		'<a href="details.html?id='+item.id+'" id="a" >'
				p +=			'<img src="'+item.get("Photo").url()+'" alt="'+item.get("Nombre")+'" class="img-responsive img-circle" />'
				p +=		'</a>'
				p +=	'</div>'
				p +=	'<div class="clearfix"></div>'
				p +='</li>'
				
				
			}
			$("#contact-list").html(p);

			var jCategoria  = Parse.Object.extend("Categoria");
			var query = new Parse.Query(jCategoria);
			query.find({
				success: function(list) {
					var inputs = "";
					for ( var i = 0; i < list.length; i++ ) {
						var item = list[i];
						inputs += '<li>'
						inputs += '<input type="checkbox" name="'+item.id+'" id="'+item.id+'"  />' + item.get("Nombre")
						inputs += '</li>'
					}
					$("#categorias").html(inputs);	
				}
			});
			
		}
	});
	
	
	
	

    if (window.location == window.parent.location) {
        $('#back-to-bootsnipp').removeClass('hide');
    }
   
    
    $('[data-toggle="tooltip"]').tooltip();
	
    $('#fullscreen').on('click', function(event) {
        event.preventDefault();
        window.parent.location = "http://bootsnipp.com/iframe/4l0k2";
    });
  
    $('a[href="#addContact"]').on('click', function(event) {
        event.preventDefault();
        $('#formUser').modal('show');
    })
    
	$('a[href="#viewDetails"]').on('click', function(event) {
        alert("Call");
    })
	
    $('[data-command="toggle-search"]').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('hide-search');
        
        if ($(this).hasClass('hide-search')) {        
            $('.c-search').closest('.row').slideUp(100);
        }else{   
            $('.c-search').closest('.row').slideDown(100);
        }
    })
    
    $('#contact-list').searchable({
        searchField: '#contact-list-search',
        selector: 'li',
        childSelector: '.col-xs-12',
        show: function( elem ) {
            elem.slideDown(100);
        },
        hide: function( elem ) {
            elem.slideUp( 100 );
        }
    })
	
	$('#fileselect').bind("change", function(e) {
		  var files = e.target.files || e.dataTransfer.files;
		  file = files[0];
	});
	
	$('#uploadbutton').click(function() {
		Parse.initialize("KQ46uP4jeqQx4fI5WpukTp1LzwJcDSXoBrtGCr5S","6zAdel7CoK4UAUEDaQJ1p8dJtrbRGPXFiZWGx0KU");
		var iContacto = Parse.Object.extend("Contacto");
		var contacto = new iContacto();
		
		
		
		var serverUrl = 'https://api.parse.com/1/files/' + file.name;
	    $.ajax({
			type: "POST",
			beforeSend: function(request) {
				request.setRequestHeader("X-Parse-Application-Id", 'KQ46uP4jeqQx4fI5WpukTp1LzwJcDSXoBrtGCr5S');
				request.setRequestHeader("X-Parse-REST-API-Key", '69yFTCbt0YKJGh59mx5wHEYf1DGqT5lY0ZoagA4Q');
				request.setRequestHeader("Content-Type", file.type);
			},
			url: serverUrl,
			data: file,
			processData: false,
			contentType: false,
			dataType: 'json',
			success: function(data) {
				var jCategoria  = Parse.Object.extend("Categoria");
				var query2 = new Parse.Query(jCategoria);
				query2.find({
					success: function(list) {
						var relation = contacto.relation("Categoria");
						for ( var i = 0; i < list.length; i++ ) {
							var item = list[i];
							var x = document.getElementById(item.id);
							if(x.checked){;
								relation.add(item);
							}
						}
						contacto.set("Nombre", $('input[name=Nombre]').val());
						contacto.set("Correo", $('input[name=Correo]').val());
						contacto.set("Telefono", $('input[name=Telefono]').val());
						var url = data.url;
						contacto.set("Photo", {
							name: url.substring(url.lastIndexOf('/') + 1),
							url: url,
							__type: "File"
							});
						contacto.save();
						$('#formUser').modal('hide');
					}
				});
				
				
			},
			error: function(data) {
			  var obj = jQuery.parseJSON(data);
			  alert(obj.error);
			}
		  });
		});
	
});