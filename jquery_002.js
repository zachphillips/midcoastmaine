/*******JQUERY UI IMAGE LOADER PLUGIN ************
*
*	by alan clarke
*	27 Feb 2011
*	alan@staticvoid.info
*
*************************************************/

$.widget( "ui.imageLoader", { 
    options: { 
        async: true,
        images: [ ]
    },
    total: 0,
    _init: function(  ) { 
        var self = this;

        self.total++;
        //load counter
        self.loaded = 0;

        //local variable to track image attributes
        self.data = [ ];

        for ( i = 0; i < self.options.images.length; i++ ) { 
            self.data.push( { 
                init: false,
                complete: false,
                error: false,
                src: self.options.images[ i ],
                img: new Image(  ),
                i: i
            } );
        }

        //controls the number of threads simmultaneously loading unloaded images
        for ( i = 0;  ( ( i < self.data.length ) && ( ( self.options.async === true || i === 0 ) || i < parseInt( self.options.async, 9 ) ) ); i++ ) { 
        
            self._loadImg( i );
            
        }
        return self;
    },
    _loadImg: function( i ) { 
        var self = this;
        if ( i !== false && i < self.data.length ) { 

            if ( !self.data[ i ].init ) { 
            
                //lock image
                self.data[ i ].init = true;
                
                self._trigger( "start", null, { 
                    i: i,
                    data: $.extend( true, { }, self.data )
                } );

                //using setTimeout to force multiple threading and give some time for garbage collection between image loads
                setTimeout( function(  ) { 
                
                    self.data[ i ].img.onload = function(  ) { 
                        self.loaded++;
                        self.data[ i ].complete = true;

                        self._trigger( "complete", null, { 
                            i: i,
                            data: $.extend( true, { }, self.data )
                        } );

                        self._complete( i );
                    };

                    //setting the src after the onload event incase image is already cached
                    self.data[ i ].img.src = self.data[ i ].src;
                    
                    //error event
                    self.data[ i ].img.onerror = function(  ) { 

                        self.loaded++;
                        self.data[ i ].error = true;
                        self._trigger( "error", null, { 
                            i: i,
                            data: $.extend( true, { }, self.data )
                        } );

                        self._complete( i );
                    };
                }, 1 );
            }
        }
    },
    _complete: function( i ) { 
        var self = this;

        //if thread is synchronous move on to next unloaded image
        if ( !self.options.async || typeof self.options.async === "number" ) { 
            var next = self._next( i );
            self._loadImg( next );
        }

        //if last image, trigger allcomplete event
        if ( self.loaded === self.data.length ) { 
            //triger complete
            self._trigger( "allcomplete", null, $.extend( true, { }, self.data ) );
        }
    },

    //returns index of next image that isn't already loading
    _next: function( j ) { 
        var self = this;
        for ( var i = 0; i < self.data.length; i++ ) { 
            if ( i !== j && !self.data[ i ].init ) { 
                return i;
            }
        }
        return false;
    },
    getData: function(  ) { 
        return $.extend( true, { }, this.data );
    },
    destroy: function(  ) { 
        $.Widget.prototype.destroy.apply( this, arguments );
    }
 } );// JavaScript Document