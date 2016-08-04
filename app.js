function Geckometer(opt) { // function Gauge
      this.canvas = opt.targetElement;      
      this.context = this.canvas.getContext('2d');
      this.setOptions();
      this.render();
}
Geckometer.prototype = {
    constructor: Geckometer,
    drawMeter: function(){
      var x = this.canvas.width / 2;
      var y = this.canvas.height / 2;
      var radius = 75;
      var startAngle = 0;
      var endAngle = Math.PI;
      var counterClockwise = true;

      this.context.beginPath();
      this.context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      this.context.lineWidth = 15;

      // line color
      this.context.strokeStyle = 'black';
      this.context.stroke();
    },
    drawPointer: function(){
      var angle, centerX, centerY, endX, endY, startX, startY, x, y;
      var pointerLength = 0.8;
      var  pointerStrokeWidth = 0.035;
      angle = 34;
      centerX = this.canvas.width / 2;
      centerY = this.canvas.height * 0.9;
      x = Math.round(centerX + pointerLength * Math.cos(angle));
      y = Math.round(centerY + pointerLength * Math.sin(angle));
      startX = Math.round(centerX + pointerStrokeWidth * Math.cos(angle - Math.PI / 2));
      startY = Math.round(centerY + pointerStrokeWidth * Math.sin(angle - Math.PI / 2));
      endX = Math.round(centerX + pointerStrokeWidth * Math.cos(angle + Math.PI / 2));
      endY = Math.round(centerY + pointerStrokeWidth * Math.sin(angle + Math.PI / 2));
      this.context.fillStyle = 'black';
      this.context.beginPath();
      this.context.arc(centerX, centerY, pointerStrokeWidth , 0, Math.PI * 2, true);
      // this.context.fill();
      this.context.stroke();
      this.context.beginPath();
      this.context.moveTo(startX, startY);
      this.context.lineTo(x, y);
      this.context.lineTo(endX, endY);
      this.context.strokeStyle = 'black';
      this.context.stroke();

      return this;
      // this.context.fill();

    //   var width = this.radius * 0.07,
    //     len = this.radius * 0.8,
    //     pos = 34;
    //    this.context.beginPath();
    // this.context.lineWidth = width;
    // this.context.lineCap = "round";
    // this.context.moveTo(0,0);
    // this.context.rotate(pos);
    // this.context.lineTo(0, -len);
    // this.context.stroke();
    // this.context.rotate(-pos);


            // var angle, centerX, centerY;
            // centerX = this.canvas.width / 2;
            // centerY = this.canvas.height * 0.9;
            // this.context.beginPath();
            // this.context.translate(centerX, centerY);
            // this.context.rotate(-180 * Math.PI/180); // Correct for top left origin
            // this.context.rotate(angle * Math.PI/180);
            // this.context.moveTo(0, 0);
            // this.context.lineTo(0, length);
            // this.context.strokeStyle = 'black';
            // this.context.stroke();

    },
    setOptions: function(){

    },
    render: function () {
        console.log('Set meter started');
        this.drawMeter();
        this.drawPointer();
    }
};


// function Meterpointer() {
     
//       this.setOptions();
//       this.render();
// }

// Meterpointer.prototype = {
//     constructor: Meterpointer,
//     setOptions: function(){

//     },
//     render: function(){

//     }
// }



var ele = document.getElementById('geckometer');
var options = {
    targetElement: ele,
    "value": 34,
    "min": 0,
    "max": 200,
    "format": "currency",
    "unit": "GBP"
}

var setMeter = new Geckometer(options);


