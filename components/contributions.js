import React from 'react'
import _ from 'lodash'
import Detail from '../components/detail'
import ContributionCard from '../components/contribution-card'
import summary from '../content/output/summary.json'
import booktitles from '../content/output/booktitles.json'
import files from '../content/output/files.json'
import vimeo from '../content/output/vimeo.json'
import Link from 'next/link'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)

// getStaticProps returning empty props to generate page with next build
export async function getStaticProps() {
  return {
    props: {},
  }
}


export function getContributions(plural,lab) {
    const fileNames = Object.keys(summary.fileMap)
    const keys = fileNames.filter((fileName) => {
      return fileName.includes(plural)
    })

    let contributions = []
    for (let key of keys) {
      const contribution = summary.fileMap[key]
      if(lab === undefined || (contribution.labs !== undefined && contribution.labs.includes(lab))){
        contributions.push(contribution)
      }
    }
    contributions = contributions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    return contributions;
  }

export function getPeople() {
    const fileNames = Object.keys(summary.fileMap)
    const keys = fileNames.filter((fileName) => {
      return fileName.includes('people')
    })

    let people = []
    for (let key of keys) {
      let id = key.split('/')[3].replace('.json', '')
      let person = Object.assign(summary.fileMap[key], { id: id })
      people.push(person)
    }

    let names = [];
    people.forEach((person) => {
      names.push(person.name);
      if(person.alias){names.push(person.alias)};
    } )
    let namesId = {}
    for (let person of people) {
      namesId[person.name] = person.id
      if(person.alias !== undefined) {namesId[person.alias] = person.id}
    }
    return {people, names, namesId}
  }

export function getPhotos() {
    const allPictures =
    files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'people')[0].children

    let pictures = []
    for (let picture of allPictures) {
      pictures.push(picture.name)
    }
    return pictures;
  }

export function getPhoto(pictures,id) {
    let img = `${id}.jpg`
    if (pictures.includes(img)) {
      return `/static/images/people/${ id }.jpg`
    } else {
      return '/static/images/people/no-profile-2.jpg'
    }
  }

export function getCovers(plural) {
    let covers = {}
    const allImages =
    files.children
    .filter(dir => dir.name === 'images')[0].children
    const contribImages = allImages
    .filter(dir => dir.name === plural);
    if (contribImages.length === 0) return covers;
    const dirs = contribImages[0]
    .children
    .filter(dir => dir.name === 'cover')[0].children
    for (let dir of dirs) {
      let id = dir.name.split(".")[0]
      covers[id] = dir.path
    }
  return covers;
}

export default function Contributions ({type, author=undefined, plural=undefined, short=false, lab=undefined}) {

  if(!type)return;
  plural = plural || `${ type }s`

  let contributions = getContributions(plural,lab);
  let {people, names, namesId} = getPeople();

  let remainingCount = contributions.length - 30
  if (short) {
    contributions = contributions.slice(0, 30)
  }
  let supervised = ""
  if (author) {
    contributions = contributions.filter((contribution) => {
      let authors = [];
      if(contribution.members){
        Object.keys(contribution.members).forEach(role => {          
          contribution.members[role].forEach(author => authors.push(author));
        }) 
      }
      if(contribution.author){
        authors.push(contribution.author);
      }
      if(contribution.authors){
        contribution.authors.forEach(author => authors.push(author));
      }
      if(contribution.advisors){
        contribution.advisors.forEach(author => authors.push(author));
      }
      if(contribution.committee){
        contribution.committee.forEach(author => authors.push(author));
      }
      return authors.includes(author.name) || authors.includes(author.alias)
    })
    let supervisedContributions = contributions.filter((contribution) => {
      if(!contribution.advisors) return false
      return contribution.advisors.includes(author.name) || contribution.advisors.includes(author.alias)
    })
    if(supervisedContributions.length>0){
      supervised = " Supervised"
    }
  }
  let pictures = getPhotos();
  let covers = getCovers(plural);

  let title = contributions.length > 1 ? plural : type;
  title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase() + supervised

  return (
    contributions.length > 0 && 
    <div id={ plural } className="category ui container">
      <h1 className="ui horizontal divider header">
        <FontAwesomeIcon icon="far fa-file-lines" />
        { short ? `Recent ${title}` : title }
      </h1>
      <div className="contributions-grid" style={{ marginTop: '50px' }}>
        { contributions.map((contribution, i) => {
          return (
            <ContributionCard
              type={ type }
              plural={ plural }
              contribution={ contribution }
              i={ i }
              covers={ covers }
              names={ names }
              namesId={ namesId }
              pictures={ pictures }
              getPhoto={ getPhoto }
              key={ i }
            />
          ) // contributions
        })}
      </div>

      <div id={`${plural}-modal`}>
        { contributions.map((contribution, i) => {
          contribution.id = contribution.base.split('.json')[0]
          return (
            <div id={contribution.id} className="ui large modal" key={ contribution.id }>
              <div className="header">
                <Link href={ `/${plural}/${contribution.id}` } target="_blank">
                  <FontAwesomeIcon icon="fas fa-link fa-fw" />{`${contribution.id}`}
                </Link>
                <div className="actions" style={{ float: 'right', cursor: 'pointer', color: 'grey' }}>
                  <FontAwesomeIcon icon="fas fa-xmark" />
                </div>
              </div>
              <div className="content">
                <Detail
                  type={ type }
                  contribution={ contribution }
                  namesId={ namesId }
                  people={ people }
                  booktitles={ booktitles }
                  files={ files }
                  vimeo={ vimeo }
                  short="true"
                />
              </div>
              <div className="actions">
                <div className="ui right cancel button">
                  Close
                </div>
              </div>
            </div>
          )
        })}
      </div>


      { short && remainingCount > 0 &&
        <div className="ui vertical segment stackable" style={{ textAlign: 'center' }}>
          <Link className="ui button" href={`/${plural}`}>
            { `+ ${remainingCount} more ${plural}` }
          </Link>
        </div>
      }
    </div>
  )
}

