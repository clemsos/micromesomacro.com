window.addEventListener( 'load', function(){
    var canvas = document.getElementById( 'cnvs' ),
        context = canvas.getContext( '2d' ),
        width = window.innerWidth < 800 ? window.innerWidth : 800,
        height = 400;

    canvas.width = width;
    canvas.height = height;

    window.addEventListener( 'resize', function(){
        width = window.innerWidth < 1200 ? window.innerWidth : 1200;
        height = 400;
        canvas.width = width;
        canvas.height = height;
    } );

    ///////////////////////////////////////////////
    var walkerCount = 10000;

    var random = function( min, max ){
        return min + Math.random() * ( max - min );
    }
    ///////////////////////////////////////////////


    function RandomWalker( x, y, color ){
        this.x = x;
        this.y = y;
        this.color = color;
    }

    RandomWalker.prototype.update = function(){
        var speed = Math.round( random( 1, 3 ) )
        this.x += Math.round( random( -1, 1 ) )*speed;
        this.y += Math.round( random( -1, 1 ) )*speed;
    };

    RandomWalker.prototype.checkBoundaries = function(){
        if( this.x<0) this.x = width;
        else if( this.x > width ) this.x = 0;

        if( this.y < 0 ) this.y = height;
        else if( this.y > height ) this.y = 0;
    };

    RandomWalker.prototype.display = function(){
        context.fillRect( this.x, this.y, 1, 1 );
    };

    var w;
    function setup(){
        w = ( new Array( walkerCount ) ).fill( 0 ).map( function(d, i){
            var margin = i*random(0,1)
            return new RandomWalker(
              width/2,
              height/2,
              'rgba(166,48,103,' + random( 0, 1 ) + ')'
            );
        } );

        animate();
    }

    function animate(){
        window.requestAnimationFrame( animate );

        context.fillStyle = 'white';
        context.fillRect( 0, 0, width, height );

        // context.fillStyle = 'rgba(30, 38, 48, 0.7)';
        w.forEach( function( d ){
            context.fillStyle = d.color;
            d.update();
            d.checkBoundaries();
            d.display();
        } );
    }

    setup();
} );
