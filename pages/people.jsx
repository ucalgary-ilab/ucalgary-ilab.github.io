import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import summary from '../content/output/summary.json'
import files from '../content/output/files.json'


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
    title = programStringFromProgram(program) + title
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

function People ({short}) {

  const [types, setTypes] = useState([])
  const [people, setPeople] = useState([])

  useEffect(() => {

    let types = [
      {key: 'faculty', title: 'Faculty'},
      {key: 'postdoc', title: 'Post Docs'},
      {key: 'phd', title: 'PhD Students'},
      {key: 'master', title: 'Masters Students'},
      {key: 'undergrad', title: 'Undergrad Students'},
      {key: 'visiting', title: 'Visiting Researchers'},
      {key: 'alumni', title: 'Alumni'}
    ]

    if (short) {
      types = types.slice(2, 6)
    }

    setTypes(types);

    const pictures = getPhotos()

    let fileNames = Object.keys(summary.fileMap)
    let keys = fileNames.filter(f => f.includes('people'))

    let people = []
    for (let key of keys) {
      let id = key.split('/')[3].replace('.json', '')
      let person = Object.assign(summary.fileMap[key], {
        id,
        photo: getPhoto(id, pictures)
      })
      people.push(person)
    }
    people = _.sortBy(people, ['order'])

    setPeople(people)

  }, [])

  return (
    <div id="people" className="category">
      <h1 className="ui horizontal divider header">
        <i className="child icon"></i>
        Researchers
      </h1>
      { short &&
      <div>
        Students are part of the <a href="https://science.ucalgary.ca/computer-science" title="Computer Science">CS</a> or <a href="https://science.ucalgary.ca/computational-media-design" title="Computational Media Design">CMD</a> programs. <a className="ui button" href="/people">See all {people.filter(p => p.type === 'alumni').length} alumni</a>
      </div>
      }
      { types.map((type) => {
        return (
          <div className="people-category" key={type.title}>
            { !short &&
            <h2>{['faculty', 'postdoc'].includes(type.key) ? '' : type.title}</h2>
            }
            <div className="ui grid">
              {people
                .filter((person) => {
                  return person.type === type.key
                }) // filter
                .map((person) => {
                  person.title = getTitle(person)
                  let colNum = type.key === 'faculty' ? 'five' : 'four'
                  return (
                    <a className={`${colNum} wide column person`} href={`/people/${person.id}`}
                        key={person.id}>
                      <img className="ui circular image medium-profile"
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
                            return <span
                              className="ui large inverted label label-brown-color">{keyword}</span>
                          })
                          }
                        </div>
                      }
                    </a>
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

export default People
