(function(){
  function House() {
    this.house = null;
    this.roof = null;
    this.color = "white";
  }
  House.prototype.buildHouse = function() {
    housesView.construction.append(housesView.houseTemplate);
    this.house = housesView.getHouses().last().fadeIn();
    this.roof = this.house.find(".roof");
  };
  House.prototype.addFloors = function(n) {
    var floors = this.house.find(".floor"),
        elems = "";

    if (floors){
      floors.remove();
    }
    for (var i = 1; i < n; i++) {
      elems += housesView.floorTemplate;
    }
    this.roof.after(elems);
    this.addColor(this.color);
  };
  House.prototype.addColor = function(color) {
    this.house.find(".floor").add(this.house.find(".basement")).css("background-color", color);
  };
  House.prototype.createControls = function() {
    controlsView.panelBody.append(controlsView.controlsTemplate);
    controlsView.getControls().last().slideDown().find("h4").text("House " + (data.houseIndex + 1));
  };

  var data = {
    houses: [],
    houseIndex: 0
  };

  var controlsView = {
    panelBody: $(".panel-body"),
    btnAddNewHouse: $(".panel-footer button"),
    controlsTemplate: $("#controlsTemplate").html(),
    getControls: function() {
      return $(".houseControls");
    }
  };

  var housesView = {
    construction: $("#construction"),
    houseTemplate: $("#houseTemplate").html(),
    floorTemplate: $("#floorTemplate").html(),
    getHouses: function() {
      return $(".house");
    }
  };

  controlsView.btnAddNewHouse.on("click", function() {
    var newHouse = new House();
    newHouse.buildHouse();
    newHouse.createControls();

    data.houses.push(newHouse);
    data.houseIndex += 1;
  });

  controlsView.panelBody.on("input click", function(e){
    var elem = $(e.target),
        currentControls = elem.parents(".houseControls"),
        currentHouse = data.houses[controlsView.getControls().index(currentControls)];

    if (e.type == "input") {
      var floorsNumber = currentControls.find('input[type="number"]'),
          floorsRange = currentControls.find('input[type="range"]');

      if(elem.attr("type") == "range") {
        var number = floorsRange.val();
        floorsNumber.val(number);
        currentHouse.addFloors(number);
      } else if (elem.attr("type") == "number") {
        var number = floorsNumber.val();
        floorsRange.val(number);
        currentHouse.addFloors(number);
      } else if (elem.hasClass("houseColor")) {
        var color = currentControls.find(".houseColor").val();
        currentHouse.color = color;
        currentHouse.addColor(color);
      }
    }
    if (e.type == "click" && (elem.hasClass("btn") || elem.hasClass("glyphicon"))) {
      currentControls.slideUp(function(){this.remove()});
      currentHouse.house.fadeOut(function(){this.remove()});
      data.houses.splice(data.houses.indexOf(currentHouse), 1);
    }
  });
})();

(function(){
  var boxForVerticalAlign = $(".vertical-align");
  if (window.innerWidth > 768)
    boxForVerticalAlign.css("height", (window.innerHeight - 170) + "px");
  $(window).on("resize", function() {
    (window.innerWidth > 768) ?
      boxForVerticalAlign.css("height", (window.innerHeight - 170) + "px") :
      boxForVerticalAlign.css("height", 0 + "px");
  });
})();