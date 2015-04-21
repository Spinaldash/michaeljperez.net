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

// *************************
//     Color Background
// *************************

var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    prob = Math.max(.0002*(h+w), .2);
    proportion = 12,
    minHeight = 2,
    maxHeight = 15,

    templateColor = 'hsla(hue, 80%, 50%, alp)',

    rects = [],
    frame = 0;

function Rect(){
  this.height = Math.random()*(maxHeight-minHeight) + minHeight;
  // /* for alternative remove the comment line initializer
  this.color = templateColor.replace('hue', (frame|0)%360).replace('alp', (.2*(this.height - minHeight)/(maxHeight - minHeight)+.3));
  // */ this.color = templateColor.replace('hue', frame%360).replace('alp', 1-(.5*(this.height - minHeight)/(maxHeight - minHeight)+.3));
  this.x = -this.height*proportion;
  this.y = Math.random()*h - this.height/2;
}
Rect.prototype.use = function(dontRender){
  this.x += this.height/2;

  if(dontRender) return;

  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.height*proportion, this.height);
}

function anim(){
  window.requestAnimationFrame(anim);

  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, w, h);

  update();
}
anim();

function update(dontRender){
  frame += .4;
  var trial = 0;
  while(Math.random() < prob && trial++ < 5) rects.push(new Rect);

  for(var i = 0; i < rects.length; ++i){
    var rec = rects[i];
    rec.use(dontRender);

    if(rec.x >= w){
      rects.splice(i, 1);
      --i;
    }
  }
}
for(var i = 0; i < 600; ++i) update(true)
