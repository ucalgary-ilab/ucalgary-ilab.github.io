import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser';

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ContributionCard ({ type, plural, contribution, i=0, covers, names, namesId, pictures, getPhoto }) {
  let authors = {}
  if (contribution.members) {
    Object.keys(contribution.members).forEach(role => {
      authors = Object.assign(authors, {[role]: contribution.members[role]});
    })
  }
  if (contribution.author) {
    authors = Object.assign(authors, {author: [contribution.author]});
  }
  if (contribution.authors) {
    authors = Object.assign(authors, {author: contribution.authors});
  }
  if (contribution.advisors) {
    authors = Object.assign(authors, {advisor: contribution.advisors});
  }
  if (contribution.committee) {
    authors = Object.assign(authors, {committee: contribution.committee});
  }
  let series = contribution.series ? parse(contribution.series) : `${contribution.degree.split("(")[1].split(")")[0]} ${contribution.date.split("-")[0]}`
  contribution.id = contribution.base.split('.json')[0]
  let hasCover = !!covers[contribution.id]

  return (
    <div className={ `${type} contribution-card` } data-id={ contribution.id }>
      <div className={ hasCover ? 'cover-wrap' : `cover-wrap no-cover card-color-${ i % 10 }` }>
        { hasCover &&
          <Image width={0} height={0} className="cover" alt={ `${contribution.id} cover` } src={ `/static/images/${plural}/cover/${contribution.id}.jpg` } />
        }
      </div>
      <div className="card-content">
        <p className="card-venue">
          { series && <span className="ui big inverted label label-color">{ series }</span>}
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
        <p className="color card-title">
            <b>
              { parse(contribution.title) }
            </b>
        </p>
        <p className="card-authors">
          {
            Object.keys(authors).map(role => {
            return authors[role].map((author) => {
              return (
                names.includes(author) ?
                <>
                <Link href={ `/people/${ namesId[author] }` } key={ author }>
                  <Image width={0} height={0} alt={ `${author} picture` } src={ getPhoto(pictures,namesId[author]) } className="ui circular spaced image mini-profile" />
                  <span className="author-link">{author}</span>
                </Link>
                {role !== "author" && <span className="role"> ({role})</span>}
                </>
                :
                <>
                <span key={ author }>{parse(author)}</span>
                {role !== "author" && <span className="role"> ({role})</span>}
                </>
              );
              }).reduce((prevA, currentA) => {if (prevA === ""){return currentA} else{return [prevA, ', ', currentA];}},"")
            }).reduce((prevR, currentR) => {if (prevR === ""){return currentR} else{return [prevR, ', ', currentR];}},"")
          }
        </p>
      </div>
    </div>
  )
}
