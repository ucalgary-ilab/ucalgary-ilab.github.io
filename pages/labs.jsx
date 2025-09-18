import React from 'react'
import ReactMarkdown from 'react-markdown'
import labs from '../content/output/labs.json'

function getProfilePhotoPath(name){
  let nameList = name.split(" ");
  let path = "/static/images/people/";
  for (let i=0; i<nameList.length; i++) {
    path += nameList[i];
    if (i < nameList.length-1) path += "-"
  }
  path += ".jpg"
  return path;
}

function Labs ({short}) {

  let colours = [
    'rgb(32, 149, 186)',
    'rgb(87, 167, 147)',
    'rgb(163, 184, 108)',
    'rgb(223, 198, 61)',
    'rgb(236, 170, 53)',
    'rgb(237, 137, 37)',
    'rgb(24, 91, 121)', 
    'rgb(193, 72, 36)',
    'rgb(240, 109, 36)',
    'rgb(216, 81, 40)',
  ]

    return (
        <div id="labs"  style={{ textAlign: 'left', marginTop: '20px', marginLeft: "15%", marginRight: "15%"}}>
          { labs.map((lab, i) => {
            if (lab.status=="current")
            {
              let labLogoSrc = `/static/images/labs/${lab.id}.png`;
              let fallbackSrc = `/static/images/labs/emptyLabLogo.png`
              let profProfileSrc = getProfilePhotoPath(lab.prof);
              return (
                <div className="card" key={ lab.id } style={{ padding: '15px' }}>
                  <a href={ lab.url } className="ui ">
                    <div style={{display: "flex"}}>
                      <div style={{ background: colours[i], zIndex: "2", borderRadius: "50%", minHeight: "6vw", height: "6vw", minWidth: "6vw", width: "6vw", justifyItems: "center"}}>
                      { lab.logo !== false &&
                        <img src={labLogoSrc} alt={`${lab.id}`} onError={(e)=>{e.target.onError = null; e.target.src = fallbackSrc}} style={{padding: "0px", borderRadius: "50%", minHeight: "6vw", height: "6vw", minWidth: "6vw", width: "6vw", justifyItems: "center"}}/>
                        || <div className='lab-name'>{`${lab.id}`}</div>     
                      }
                      {
                        lab.id === '' &&
                        <img />
                      }
                      </div>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <img style={{transform: "translateX(-1vw)", borderRadius: "50%", minHeight: "6vw", height: "6vw", minWidth: "6vw", width: "6vw", padding: "0px"}}
                            src={profProfileSrc}/>
                        <p style={{marginLeft: "5px"}}> <span style={{color: `${colours[i]}`, fontWeight: "700", fontSize: "1.7em"}}> {lab.lab} </span> 
                          <span style={{fontSize: "1.15em"}}> (<span style={{fontWeight: "600"}}>Prof. { lab.prof }</span>) {lab.statement} </span> </p>
                      </div>
                    </div>
                  </a>
                </div>
              )
            }
          })}
          <h2>
            Associated Research Groups
          </h2>
          { labs.map((lab, i) => {
            if (lab.status=="alum")
            {
              // return (
                
              // )
            }
          })}
        </div>
    )
  }


export default Labs
