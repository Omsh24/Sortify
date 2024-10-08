import React from 'react'
import './Sortv.css'

function Bar({height, color}) {

    let newheight = height + "%"

    return (
        <div className='bar' style={{height: newheight,
            backgroundColor : color
        }}>

        </div>
    )
}

export default Bar
