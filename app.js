function Geckometer(opt) { // function Gauge
      this.options = opt;
      this.canvas = opt.targetElement;      
      this.context = this.canvas.getContext('2d');
      this.mp = new Meterpointer(this);
      this.displayMin = this.getFormat() + this.options.min;
      this.displayMax = this.getFormat() + this.options.max;
      this.displayValue = this.getFormat() + this.options.value;
      // this.setOptions();
      this.render();
}
Geckometer.prototype = {
    // constructor: Geckometer,
    drawMeter: function(){
      var x = this.canvas.width/2;
      var y = this.canvas.height - 50;
      var radius = 75;
      var startAngle = 0;
      var endAngle = Math.PI;
      var counterClockwise = true;

      this.context.beginPath();
      this.context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      this.context.lineWidth = 15;

      // line color
      this.context.strokeStyle = 'grey';
      this.context.stroke();

      // showing the min value and max value text on the component
      this.context.font = '50px Verdana';
      this.context.fillStyle = 'white';
      this.context.fillText(this.displayValue, 210, 80);
      this.context.font = '14px Verdana';
       this.context.fillStyle = 'grey';
      this.context.fillText(this.displayMin, 160, 220);
      this.context.fillText(this.displayMax, 305, 220);
      
    },
    // setOptions: function(){

      
    // },
    getFormat: function(){
      switch (this.options.unit) {
          case "GBP":
            return '£';
            break;
          case "USD":
           return '$';
            break;
          default:
            return '£';
        }
    },
    render: function () {
        this.drawMeter();
    }
};


function Meterpointer(geckometerObj) {
     this.mp = geckometerObj;
     this.options = this.mp.options;
     this.context = this.mp.context;
     this.canvas = this.mp.canvas;
     this.value = this.options.value || 0;
     this.min = this.options.min || 0;
     this.max = this.options.max || 200;
     this.length = 0.4;
     this.strokeWidth = 4;
     this.fillColor = 'grey';
     this.setOptions();
     this.render();
}

Meterpointer.prototype = {
    setOptions: function(){
      if(this.value > this.max){
        this.value = this.max;
      }
      if(this.value < this.min){
        this.value = this.min;
      }
    },
    getAngle : function() {
      return (1 - this.value) * Math.PI + ((this.value - this.min) / (this.max - this.min)) * ((2 + this.value) - (1 - this.value)) * Math.PI;
    },
    render: function(){
      var angle, centerX, centerY, endX, endY, startX, startY, x, y;
      angle = this.getAngle();
      var radius = 75;
      centerX = this.canvas.width / 2;
      centerY = this.canvas.height * 0.8;
      x = Math.round(centerX + radius * Math.cos(angle));
      y = Math.round(centerY + radius * Math.sin(angle));
      startX = Math.round(centerX + this.strokeWidth * Math.cos(angle - Math.PI / 2));
      startY = Math.round(centerY + this.strokeWidth * Math.sin(angle - Math.PI / 2));
      endX = Math.round(centerX + this.strokeWidth * Math.cos(angle + Math.PI / 2));
      endY = Math.round(centerY + this.strokeWidth * Math.sin(angle + Math.PI / 2));
     
      this.context.beginPath();
      this.context.moveTo(startX, startY);
      this.context.lineTo(x, y);
      this.context.strokeStyle = 'white';
      this.context.lineWidth = 4;
      // this.context.lineTo(endX, endY);
      this.context.stroke();
    }
}



var ele = document.getElementById('geckometer');
var options = {
    targetElement: ele,
    "value": 30,
    "min": 0,
    "max": 180,
    "format": "currency",
    "unit": "GBP"
}

var setMeter = new Geckometer(options);


