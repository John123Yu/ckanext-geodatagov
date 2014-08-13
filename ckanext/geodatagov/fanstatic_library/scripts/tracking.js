$(function (){
  // Tracking
  var url = location.pathname;
  // remove any site root from url
//  console.log($('body').data('site-root'));
  url = url.substring($('body').data('locale-root'), url.length);
  // trim any trailing /
  url = url.replace(/\/*$/, '');
  $.ajax({url : $('body').data('site-root') + '_tracking',
          type : 'POST',
          data : {url:url, type:'page'},
          timeout : 300 });
  $('a.resource-url-analytics').click(function (e){
    var url = $(e.target).closest('a').attr('href');
    $.ajax({url : $('body').data('site-root') + '_tracking',
            data : {url:url, type:'resource'},
            type : 'POST',
            complete : function () {location.href = url;},
            timeout : 30});
    e.preventDefault();
  });

  $('div.btn-group a.btn.btn-primary').each(function(){
        if($(this).find('i').attr('class') == 'icon-external-link' || $(this).find('i').attr('class') == 'icon-download-alt') {
            $(this).click(function(){
                var url = $(this).closest('a').attr('href');
                $.ajax({url : $('body').data('site-root') + '_tracking',
                    data : {url:url, type:'resource'},
                    type : 'POST',
                    complete : function () {location.href = url;},
                    timeout : 30});
                e.preventDefault();
            });
        }
  });
});
