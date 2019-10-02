jQuery(document).ready(function($) {
    //
    // ─── SCRIPT MENU + MENU RESPONSIVE ───────────────────────────────────────────────
    //
    "use strict"; // Inicio de uso estricto
    // jQuery para la función de desplazamiento página - requiere plugin: (jQuery Easing)
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
    // Cierra el menu responsivo con click en el icono de menu(icono toogle)
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
        $('.navbar-toggle:visible').click();
    });
    // Fija menu en fondo Negro a los 100 de scroll
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });
    //
    // ─── SCRIPT PARA BUTTON SCROLLUP ────────────────────────────────────────────────
    //
    $('#btn_scrollUp').hide();
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 400) {
                $('#btn_scrollUp').fadeIn(300);
            } else {
                $('#btn_scrollUp').fadeOut(300);
            }
        });
        $('#btn_scrollUp').click(function() {
            $('body, html').animate({
                scrollTop: 0
            }, 2800, 'easeInOutExpo');
            return false;
        });
    });
    //
    // ─── SCRIPT PARA FILTRO PORTAFOLIO ──────────────────────────────────────────────
    //
    $(function() {
        //Llama a la funcion de la libreria mixitup
        $('#ContainerMixJS').mixItUp();
    });
    //
    // ─── SCRIPT PARA MOSTRAR / OCULTAR EL MENU AL FINAL DE LA PAGINA ──────────────────
    //
    //Cuando este en a secicon #footer -> ocultar
    $('#footer').waypoint(function(direction) {
        $('#mainNav').fadeOut(500);
    });
    //Cuando este en a secicon #contacto -> mostrar de nuevo
    $('#contacto').waypoint(function(direction) {
        $('#mainNav').fadeIn(500);
    });

});
//
// ─── SCRIPT PARA ANIMACION DE LAS BAR PROGRESS ──────────────────────────────────
//
//Esperando parametro del html, ejemplo: progressBar("skill", 75, $('#progressBar'));
function progressBar(skill, percent, $element) {
    var skill;
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({
        width: progressBarWidth
    }, 1500, 'easeOutQuint').html("<span>" + skill + "</span>" + percent + "%&nbsp;");
}
