  var themer = function(settings) {
    function log(data) {console.log("%c Themer: "+data,'color: #170f44');}
    log("Starting Themer");
    if(!window.jQuery)
      throw new Error("JQuery missing");
    if(!jQuery.ui)
      throw new Error("JQuery UI missing")
    var css = ".themer .bar,.themer .bar-holder:hover{background-color:#FFF}.themer,.themer input{font-family:Montserrat,sans-serif}#themer{bottom:10px;right:10px}.themer{display:inline-block;flex-flow:column;position:fixed;width:250px;color:#FFF;letter-spacing:2px}.themer #toggle{float:right}.themer .bar-holder{padding:10px}.themer .colors{box-shadow:0 2px 10px rgba(0,0,0,.3)}.themer .bar{width:12px;height:2px}.themer .bar-holder:hover .bar{background-color:#000}.themer .color.scheme-dark{color:#131313!important}.themer .hex,.themer .label{padding:20px;color:inherit;font-size:14px}.themer .color{display:flex}.themer .upper{background-color:#131313;padding:25px;align-items:center;font-size:14px;cursor:pointer}.themer input{background:0 0;border:none;color:#FFF;outline:0}.themer-highlight{border:1px solid #1e90ff}";
    function contrast(hexcolor) {
      hexcolor = hexcolor.substring(1);
      if (hexcolor.length == 3)
        hexcolor = hexcolor.split("")
          .map(function(o) {
            return o + o;
          })
          .join("");
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "scheme-dark" : "";
    }
    this.settings = settings;
    var colors = settings.colors;
    var ui = $('<div id="themer" class="themer"><div class="upper">Themer<div id="toggle" class="bar-holder"><div class="bar"></div></div></div><div class="colors"></div></div>');
    function update(set) {
      set.hex = set.hex || "#131313";
      if (!set.background) $("." + set.tag).css({ color: set.hex });
      else $("." + set.tag).css({ backgroundColor: set.hex });
    }
    function updateUI(elem) {
      $(elem).parent().removeClass("theme-dark");
      $(elem).parent().addClass(contrast($(elem).val() || "#131313"));
      $(elem).parent().css({ backgroundColor: $(elem).val() || "#131313" });
    }
    $(function() {
      $("#themer").draggable();
    });
    $(ui).find("#toggle").on("click", function() {
      $(ui).find(".colors").toggle();
    });
    colors.forEach(function(set, i) {
      update(set);
      colors[i].elem = $(
        '<div class="color ' +
          contrast(set.hex) +
          '" style="background-color:' +
          set.hex +
          '"><div class="label">' +
          set.tag +
          '</div><input class="hex" placeholder="' +
          set.tag +
          '" value="' +
          set.hex +
          '"></input></div>'
      );
      updateUI(colors[i].elem);
      $(ui).find('.colors').append(colors[i].elem);
      $(colors[i].elem).find(".hex").on("change", function() {
        set.hex = $(this).val();
        update(set);
        updateUI(this);
      });
      if (settings.highlights) {
        log("Highlights are enabled");
        $(colors[i].elem).find(".hex").on("focus", function() {
          $("." + set.tag).addClass("themer-highlight");
        });
        $(colors[i].elem).find(".hex").on("focusout", function() {
          $("." + set.tag).removeClass("themer-highlight");
        });
      }
    });
    log("Done!");
    $("body").append(ui);
    $("head").append($("<style>"+css+"</style>"));
  };
