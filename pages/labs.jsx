import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import labs from '../content/output/labs.json'

function getProfilePhotoPath(name){
  return "/static/images/people/"+name.toLowerCase().split(" (")[0].split(" ").join("-")+".jpg"
}

function Labs ({short}) {

  let colours = [
    'rgb(24, 91, 121)', 
    'rgb(32, 149, 186)',
    'rgb(87, 167, 147)',
    'rgb(163, 184, 108)',
    'rgb(223, 198, 61)',
    'rgb(236, 170, 53)',
    'rgb(237, 137, 37)',
    'rgb(193, 72, 36)',
    'rgb(240, 109, 36)',
    'rgb(216, 81, 40)',
  ]

    return (
      <div id="labs" className="ui two column centered grid">
        <div className="ui text container left aligned">
          { labs.map((lab, i) => {
            if (lab.status!="associated")
            {
              let labLogoSrc = `/static/images/labs/${lab.id}.png`;
              let fallbackSrc = `/static/images/labs/emptyLabLogo.png`
              let profProfileSrc = getProfilePhotoPath(lab.prof);
              return (
                <div className="card" key={ lab.id } style={{ padding: '15px' }}>
                  <Link href={ lab.url } className="ui ">
                    <div style={{display: "flex"}}>
                      <div style={{ background: colours[i], zIndex: "2", borderRadius: "50%", minHeight: "6vw", height: "6vw", minWidth: "6vw", width: "6vw", justifyItems: "center"}}>
                      { lab.logo !== false &&
                        <Image width="0" height="0" src={labLogoSrc} alt={`${lab.id}`} onError={(e)=>{e.target.onError = null; e.target.src = fallbackSrc}} style={{padding: "0px", borderRadius: "50%", minHeight: "6vw", height: "6vw", minWidth: "6vw", width: "6vw", justifyItems: "center"}}/>
                        || <div className='lab-name'>{`${lab.id}`}</div>     
                      }
                      {
                        lab.id === '' &&
                        <Image width="0" height="0" />
                      }
                      </div>
                      <Image width="0" height="0" style={{transform: "translateX(-1vw)", borderRadius: "50%", minHeight: "6vw", height: "6vw", minWidth: "6vw", width: "6vw", padding: "0px"}}
                            src={profProfileSrc}/>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <p style={{marginLeft: "5px"}}> <span style={{color: `${colours[i]}`, fontWeight: "700", fontSize: "1.7em"}}> {lab.name} </span> 
                          <span style={{fontSize: "1.15em"}}> (<span style={{fontWeight: "600"}}>Prof. { lab.prof }</span>) {lab.statement} </span> </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            }
          })}
          <h2>
            Associated Research Groups
          </h2>
          <div className="associatedGroups" style={{display: "flex", flexWrap: "wrap", marginTop: "5vh"}}>
            { console.log(labs)}
            { labs.map((lab, i) => {
              if (lab.status=="associated")
              {
                let labLogoSrc = `/static/images/labs/${lab.id}.png`;
                let fallbackSrc = `/static/images/labs/emptyLabLogo.png`
                let profProfileSrc = getProfilePhotoPath(lab.prof);
                let colourIndex = i-2
                return (
                    <div className="card" key={ lab.id } style={{flex: "50%", marginBottom: "3vh"}}>
                      <Link href={ lab.url } className="ui ">
                        <div style={{display: "flex"}}>
                          <div style={{ background: colours[colourIndex], zIndex: "2", borderRadius: "50%", minHeight: "4.5vw", height: "4.5vw", minWidth: "4.5vw", width: "4.5vw", justifyItems: "center"}}>
                          { lab.logo !== false &&
                            <Image width="0" height="0" src={labLogoSrc} alt={`${lab.id}`} onError={(e)=>{e.target.onError = null; e.target.src = fallbackSrc}} style={{padding: "0px", borderRadius: "50%", minHeight: "4.5vw", height: "4.5vw", minWidth: "4.5vw", width: "4.5vw", justifyItems: "center"}}/>
                            || <div className='lab-name'>{`${lab.id}`}</div>     
                          }
                          {
                            lab.id === '' &&
                            <Image width="0" height="0" />
                          }
                          </div>
                          <Image width="0" height="0" style={{transform: "translateX(-1vw)", borderRadius: "50%", minHeight: "4.5vw", height: "4.5vw", minWidth: "4.5vw", width: "4.5vw", padding: "0px"}}
                                src={profProfileSrc}/>
                          <div style={{display: "flex", alignItems: "center"}}>
                            <p> <span style={{color: `${colours[colourIndex]}`, fontWeight: "700", fontSize: "1.15em"}}> {lab.name} </span> 
                              <span style={{fontSize: "0.8em"}}> (Dr. { lab.prof } - {lab.title}) {lab.description}. </span> </p>
                          </div>
                        </div>
                      </Link>
                  </div>  
                )
              }
            })} 
          </div> 
        </div>
      </div>
    )
  }


export default Labs
