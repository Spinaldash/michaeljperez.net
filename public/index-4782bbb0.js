var slider = {

  // Not sure if keeping element collections like this
  // together is useful or not.
  el: {
    slider: $("#slider"),
    allSlides: $(".slide"),
    sliderNav: $(".slider-nav"),
    allNavButtons: $(".slider-nav > a")
  },

  timing: 800,
  slideWidth: 300, // could measure this

  // In this simple example, might just move the
  // binding here to the init function
  init: function() {
    this.bindUIEvents();
  },

  bindUIEvents: function() {
    // You can either manually scroll...
    this.el.slider.on("scroll", function(event) {
      slider.moveSlidePosition(event);
    });
    // ... or click a thing
    this.el.sliderNav.on("click", "a", function(event) {
      slider.handleNavClick(event, this);
    });
    // What would be cool is if it had touch
    // events where you could swipe but it
    // also kinda snapped into place.
  },

  moveSlidePosition: function(event) {
    // Magic Numbers =(
    this.el.allSlides.css({
      "background-position": $(event.target).scrollLeft()/6-100+ "px 0"
    });
  },

  handleNavClick: function(event, el) {
    event.preventDefault();
    var position = $(el).attr("href").split("-").pop();

    this.el.slider.animate({
      scrollLeft: position * this.slideWidth
    }, this.timing);

    this.changeActiveNav(el);
  },

  changeActiveNav: function(el) {
    this.el.allNavButtons.removeClass("active");
    $(el).addClass("active");
  }

};

slider.init();

// ******************
// BounceIn Letters
// ******************

// Animate function
function stepAnimateText(element, animation, delay){

  var text = $(element).text();
  var curr = '';

  for (var i=0; i < text.length; i++){
    var character = text.charAt(i);
    $(element).html(curr+'<span class="'+animation+'" style="-webkit-animation-delay: '+i*delay+'s; animation-delay: '+i*delay+'s">'+character +"</span>");
    curr = $(element).html();
  }
}

// Init on load
stepAnimateText('.fade','bounceInDown', 0.25);

// Buttons
$('.button.button-fadeindown').click(function(){
  var delay = $('select').val();
  stepAnimateText('.fade','fadeInDown', delay);
  return false;
});
$('.button.button-bounceindown').click(function(){
  var delay = $('select').val();
  stepAnimateText('.fade','bounceInDown',delay);
  return false;
});
$('.fade-container').click(function(){
  var delay = $('select').val();
  stepAnimateText('.fade','bounceInDown',delay);
  return false;
});
