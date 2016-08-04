function Geckometer(opt) { // function Gauge
      this.options = opt;
      this.canvas = opt.targetElement;      
      this.context = this.canvas.getContext('2d');
      this.mp = new Meterpointer(this);
      this.setOptions();
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
    },
    setOptions: function(){

    },
    render: function () {
        console.log('Set meter started');
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
     // this.setOptions();
     this.render();
}

Meterpointer.prototype = {
    setOptions: function(){

    },
    render: function(){
      var angle, centerX, centerY, endX, endY, startX, startY, x, y;
      angle = 34;
      centerX = this.canvas.width / 2;
      centerY = this.canvas.height * 0.9;
      x = Math.round(centerX + this.length * Math.cos(angle));
      y = Math.round(centerY + this.length * Math.sin(angle));
      startX = Math.round(centerX + this.strokeWidth * Math.cos(angle - Math.PI / 2));
      startY = Math.round(centerY + this.strokeWidth * Math.sin(angle - Math.PI / 2));
      endX = Math.round(centerX + this.strokeWidth * Math.cos(angle + Math.PI / 2));
      endY = Math.round(centerY + this.strokeWidth * Math.sin(angle + Math.PI / 2));
     
      this.context.beginPath();
      this.context.moveTo(startX, startY);
      this.context.lineTo(x, y);
      this.context.strokeStyle = 'grey';
      this.context.lineWidth = 4;
      this.context.lineTo(endX, endY);
      this.context.stroke();

      // showing the min value and max value text on the component
      var minTextPosX = this.canvas.width/2;
      var minTextPosY = this.canvas.height - 50;
      this.context.font = '80 Verdana';
      this.context.fillStyle = 'grey';
      this.context.fillText(this.min, minTextPosX, minTextPosY);
      this.context.fillText(this.max, 100, 100);
    }
}



var ele = document.getElementById('geckometer');
var options = {
    targetElement: ele,
    "value": 34,
    "min": 34,
    "max": 180,
    "format": "currency",
    "unit": "GBP"
}

var setMeter = new Geckometer(options);


