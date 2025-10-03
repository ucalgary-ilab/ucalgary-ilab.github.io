import _ from 'lodash'
import summary from '../content/output/summary.json'
import files from '../content/output/files.json'
import Image from 'next/image'
import Link from 'next/link'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)


export async function getStaticProps() {

  const pictures = getPhotos()

  let fileNames = Object.keys(summary.fileMap)
  let keys = fileNames.filter(f => f.includes('people'))

  let people = keys.map(key => {
    let id = key.split('/')[3].replace('.json', '')
    return {
      ...summary.fileMap[key],
      id,
      photo: getPhoto(id, pictures)
    }
  })
  people = _.sortBy(people, ['order'])

  return { props: { people } }
}


function typeStringFromType(type) {
  switch (type) {
    case 'postdoc': return 'Postdoc'
    case 'phd': return 'PhD'
    case 'master': return 'MSc'
    case 'undergrad': return 'Ugrad'
    case 'visiting': return 'Visiting'
  }
  return ''
}

function programStringFromProgram(program) {
  switch (program) {
    case 'cs': return 'CS '
    case 'cmd': return 'CMD '
  }
  return ''
}

function getTitle(person) {
  let title = typeStringFromType(person.type)

  if (person.program) {
    title = programStringFromProgram(person.program) + title
  }

  if (person.type === 'alumni') {
    title = `Alumni (${typeStringFromType(person.past)})`
  }

  return title
}

function getPhotos() {
  return files.children
    .filter(dir => dir.name === 'images')[0].children
    .filter(dir => dir.name === 'people')[0].children
    .map(image => image.name)
}

function getPhoto(id, pictures) {
  let img = `${id}.jpg`
  if (pictures.includes(img)) {
    return `/static/images/people/${ id }.jpg`
  } else {
    return '/static/images/people/no-profile.jpg'
  }
}

export default function People ({people, short=false, lab=undefined}) {

  let types = [
    {key: 'faculty', title: 'Faculty'},
    {key: 'postdoc', title: 'Postdocs'},
    {key: 'phd', title: 'PhD Students'},
    {key: 'master', title: "Master's Students"},
    {key: 'undergrad', title: 'Undergrad Students'},
    {key: 'visiting', title: 'Visiting Researchers'},
    {key: 'alumni', title: 'Alumni'}
  ]

  if (short) {
    types = types.slice(2, 6)
  }

  return (
    <div id="people" className="category">
      <h1 className="ui horizontal divider header">
        <FontAwesomeIcon icon="fas fa-child-reaching" />
        Researchers
      </h1>
      { short &&
      <div>
        Students are part of the <Link href="https://science.ucalgary.ca/computer-science" title="Computer Science">CS</Link> or <Link href="https://science.ucalgary.ca/computational-media-design" title="Computational Media Design">CMD</Link> programs. <Link className="ui button" href="/people">See all {people.filter(p => p.type === 'alumni').length} alumni</Link>
      </div>
      }
      { types.map((type) => {
        const typePeople = people.filter(person => (person.type === type.key && (lab === undefined || (person.labs && person.labs.includes(lab)))))
        return (
         (typePeople.length > 0) &&
          <div className="people-category" key={type.title}>
            { !short &&
            <h2>{type.title}</h2>
            }
            <div className="ui grid">
              {typePeople.map((person) => {
                  person.title = getTitle(person)
                  let colNum = type.key === 'faculty' ? 'five' : 'four'
                  return (
                    <Link className={`${colNum} wide column person`} href={`/people/${person.id}`}
                        key={person.id}>
                      <Image width={0} height={0} className="ui circular image medium-profile"
                          src={person.photo}/>
                      <p><b>{person.name}</b></p>
                      <p>
                        {person.title}
                        {person.now &&
                          <span><br/>{person.now}</span>
                        }
                      </p>
                      {type.key === 'faculty' &&
                        <div className="ui large basic labels">
                          {person.keywords.map((keyword) => {
                            return <span key={keyword}
                              className="ui large inverted label label-brown-color">{keyword}</span>
                          })
                          }
                        </div>
                      }
                    </Link>
                  ) // return
                }) // map
              }
            </div>
          </div>
      )
      })}
    </div>
  )
}
