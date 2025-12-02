import { animate, createScope, spring, createDraggable, stagger } from 'animejs';
import './../App.scss'
import { useEffect, useRef } from 'react';
function Loading(){

     useEffect(()=>{
        
        animate('.circle', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: spring({ bounce: .7 }) }
        ],
        translateX:[
            {to: 500, ease: 'in(1)', duration:500},
            {to: 0, ease: 'out(1)', duration:500}
        ],
        delay: stagger(100),
        loop: true,
      });
     }, [])

    return(
        <>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        </>
    )
}

export default Loading