/*global Sketch*/
'use strict';

var piano = new Wad({
    source : 'square', 
    env : {
        attack : .01, 
        decay : .005, 
        sustain : .2, 
        hold : .015, 
        release : .3
    },
    filter : {
        type : 'lowpass',
        frequency : 1200,
        q : 8.5, 
        env : {
            attack : .2,
            frequency : 440
        }
    }
});

function lineLength(x1,y1,x2,y2) {
    var discriminant = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2),2);
    return Math.sqrt(discriminant);
}

function noteName (pitch) {

    switch (pitch) {
        case 110.0:
            return 'A2';
        case 116.5:
            return 'A#2';
        case 123.5:
            return 'B2';
        case 130.8:
            return 'C3';
        case 138.6:
            return 'C#3';
        case 146.8:
            return 'D3';
        case 155.6:
            return 'D#3';
        case 164.8:
            return 'E3';
        case 174.6:
            return 'F3';
        case 185.0:
            return 'F#3';
        case 196.0:
            return 'G3';
        case 207.7:
            return 'G#3';
        case 220.0:
            return 'A3';
        case 233.1:
            return 'A#3';
        case 246.9:
            return 'B3';
        case 261.6:
            return 'C4';
        case 277.2:
            return 'C#4';
        case 293.7:
            return 'D4';
        case 311.1:
            return 'D#4';
        case 329.6:
            return 'E4';
        case 349.2:
            return 'F4';
        case 370.0:
            return 'F#4';
        case 392.0:
            return 'G4';
        case 415.3:
            return 'G#4';
        case 440.0:
            return 'A4';
        case 466.2:
            return 'A#4';
        case 493.9:
            return 'B4';
        case 523.3:
            return 'C5';
        case 554.4:
            return 'C#5';
        case 587.3:
            return 'D5';
        case 622.3:
            return 'D#5';
        case 659.3:
            return 'E5';
        case 698.5:
            return 'F5';
        case 740.0:
            return 'F#5';
        case 784.0:
            return 'G5';
        case 830.6:
            return 'G#5';
        case 880.0:
            return 'A5';
        case 932.3:
            return 'A#5';
        case 987.8:
            return 'B5';
        case 1046.5:
            return 'C6';
        case 1108.7:
            return 'C#6';
        case 1174.7:
            return 'D6';
        case 1244.5:
            return 'D#6';
        case 1318.5:
            return 'E6';
        case 1396.9:
            return 'E#6';
        case 1480.0:
            return 'F6';
        case 1568.0:
            return 'F#6';
        case 1661.2:
            return 'G6';
        default:
            return '';
    }
}


// http://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}


function GuitarString(x1, y1, x2, y2) {
    this.init(x1,y1,x2,y2);

}


GuitarString.prototype = {
    init : function(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.a = 0;
              

        if (startX - endX === 0) {
            this.len = Math.abs (startY - endY);
            
        } else if (startY - endY === 0) {
            this.len = Math.abs (startX - endX);
            
        } else {
            var discriminant = Math.pow((startX - endX), 2) + Math.pow((startY-endY),2);
            this.len = Math.sqrt(discriminant);
            

        }
        this.frequency = 900/(this.len*2);
    },

    playSound : function () {
        piano.play({ pitch : this.frequency*200 });
    },

    strum : function() {
        this.a = 2;
        this.playSound();
    },

    drawSin : function(ctx, t) {
        var x = t;
        var y = this.a*Math.sin(this.frequency*x);
        
        for (var j = this.startY; j <= this.endY; j += 2) {
         
            x = t + (-this.startX + j)/10;
            y = this.a*Math.sin(this.frequency*x);
            ctx.lineTo(10*y+this.startX,j );
        }

    },


    draw : function(ctx) {

        ctx.beginPath();
        ctx.arc(this.startX,this.startY,2,0,Math.PI*2,true);
        ctx.moveTo(this.startX, this.startY);
        if (this.a > 0) {

            this.drawSin(ctx, seconds*Math.PI);
            
            
            
        } else {
            ctx.lineTo(this.endX, this.endY);

        }
        
        ctx.arc(this.endX,this.endY,2,0,Math.PI*2,true);
        ctx.stroke();
        
        ctx.font = '12px Quantico';
        ctx.fillText(Math.round(this.frequency*200*10)/10 + ' Hz', this.endX + 10, this.endY);
        this.a *= 0.95;
      
    }
};

var startX, startY;
var prevX, prevY;
var strings = [];
var isDragging = false;
var seconds = 0;

Sketch.create({

    container: document.getElementById( 'container' ),
    autoclear: false,

    setup: function() {
        console.log( 'setup' );
    },

    update: function() {


    },

    draw: function() {
        this.clear();
        for ( var i = 0; i < strings.length; i++ ) {
            strings[i].draw( this );
        }
        if (isDragging) {
            this.beginPath();
            this.arc(startX,startY,2,0,Math.PI*2,true);
            this.moveTo(startX, startY);
            
            this.lineTo( this.mouse.x, this.mouse.y );
            this.strokeStyle = '#FFFCC4';
            this.lineWidth = 2;
            this.stroke();
            this.font = '12px Quantico';
            var freq = 900/(2*lineLength(startX, startY, this.mouse.x, this.mouse.y));
            var ptch = Math.round(freq*200*10)/10;
           
            this.fillText(ptch + ' Hz ' + noteName(ptch), this.mouse.x + 10, this.mouse.y);
            this.fillStyle = '#FFFCC4';
        }
        seconds = seconds + 0.007;

    },

    // Event handlers

    touchstart: function() {
        startX = this.mouse.ox;
        startY = this.mouse.oy;
    },

    touchmove: function() {
        var x = this.mouse.x,
            y = this.mouse.y;
        
        if (this.dragging) {
            isDragging = true;
        } else {
            for ( var i = 0; i < strings.length; i++ ) {
                var check = lineIntersect(strings[i].startX, strings[i].startY,
                                          strings[i].endX, strings[i].endY,
                                          prevX, prevY, x, y);
                if (check) {
                    strings[i].strum();
                }
            }

        }

        prevX = x;
        prevY = y;

        setInterval(function() {
            this.limit = false;
        }, 1000);
    },

    touchend: function() {
        isDragging = false;
        var stringToBeAdded = new GuitarString(startX, startY, this.mouse.x, this.mouse.y);
        
        strings.push(stringToBeAdded);

    }
});
        
