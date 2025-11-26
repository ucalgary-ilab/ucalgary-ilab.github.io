import React from 'react'
import _ from 'lodash'
import Detail from '../components/detail'
import summary from '../content/output/summary.json'
import booktitles from '../content/output/booktitles.json'
import files from '../content/output/files.json'
import vimeo from '../content/output/vimeo.json'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser';

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


function getContributions(plural,lab) {
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

function getPeople() {
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

function getPhotos() {
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

function getPhoto(pictures,id) {
    let img = `${id}.jpg`
    if (pictures.includes(img)) {
      return `/static/images/people/${ id }.jpg`
    } else {
      return '/static/images/people/no-profile-2.jpg'
    }
  }

function getCovers(plural) {
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

  if (short) {
    contributions = contributions.slice(0, 30)
  }
  if (author) {
    contributions = contributions.filter((contribution) => {
      return contribution.authors.includes(author.name) || contribution.authors.includes(author.alias)
    })
  }
  let pictures = getPhotos();
  let covers = getCovers(plural);

  let title = contributions.length > 1 ? plural : type;
  title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()

  return (
    contributions.length > 0 && 
    <div id={ plural } className="category">
      <h1 className="ui horizontal divider header">
        <FontAwesomeIcon icon="far fa-file-lines" />
        { short ? `Recent ${title}` : title }
      </h1>
      <div className="ui segment" style={{ marginTop: '50px' }}>
        { contributions.map((contribution, i) => {
          contribution.id = contribution.base.split('.json')[0]
          return (
            <div className={ `${type} ui vertical segment stackable grid` } data-id={ contribution.id } key={ i }>
              <div className="three wide column" style={{ margin: 'auto' }}>
                { covers[contribution.id] &&
                  <Image width={0} height={0} className="cover" alt={ `${contribution.id} cover` } src={ `/static/images/${plural}/cover/${contribution.id}.jpg` } />
                }
              </div>
              <div className="thirteen wide column">
                <p>
                  <span className="ui big inverted label label-color">{ parse(contribution.series) }</span>
                  { contribution.award &&
                    <span className="ui big basic pink label">
                    { contribution.award === 'Honorable Mention' &&
                      <b><FontAwesomeIcon icon="fas fa-award" /> Honorable Mention</b>
                    }
                    { contribution.award === 'Best Paper' &&
                      <b><FontAwesomeIcon icon="fas fa-trophy" /> Best Paper</b>
                    }
                    </span>
                  }
                </p>
                <p className="color" style={{ fontSize: '1.3em' }}>
                    <b>
                      { parse(contribution.title) }
                    </b>
                </p>
                <p>
                  { contribution.authors.map((author) => {
                      return (
                        names.includes(author) ?
                        <Link href={ `/people/${ namesId[author] }` } key={ author }>
                          <Image width={0} height={0} alt={ `${author} picture` } src={ getPhoto(pictures,namesId[author]) } className="ui circular spaced image mini-profile" />
                          <span className="author-link">{author}</span>
                        </Link>
                        :
                        <span key={ author }>{parse(author)}</span>
                      )
                    }).reduce((prev, current) => [prev, ' , ', current])
                  }
                </p>
                <div>
                { contribution.keywords &&
                <div className="ui large basic labels">
                  { 
                    [...new Set(contribution.keywords.split(', '))].map((keyword) => {
                    return <span className="ui brown basic label" key={ keyword }>{ _.startCase(keyword) }</span>
                  }) 
                  }
                </div>
                }
                </div>
              </div>
            </div>
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


      { short &&
        <div className="ui vertical segment stackable" style={{ textAlign: 'center' }}>
          <Link className="ui button" href={`/${plural}`}>
            { `+ ${contributions.length} more ${plural}` }
          </Link>
        </div>
      }
    </div>
  )
}

