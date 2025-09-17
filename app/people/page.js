'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import summary from '../../content/output/summary.json'
import files from '../../content/output/files.json'

class People extends React.Component {
  constructor(props) {
    super(props)

    this.types = [
      {key: 'faculty', title: 'Faculty'},
      {key: 'postdoc', title: 'Post Docs'},
      {key: 'phd', title: 'PhD Students'},
      {key: 'master', title: 'Masters Students'},
      {key: 'undergrad', title: 'Undergrad Students'},
      {key: 'visiting', title: 'Visiting Researchers'},
      {key: 'alumni', title: 'Alumni'}
    ]


    this.title = 'People'

    if (this.props.faculty) {
      this.types = this.types.slice(0, 1)
      this.title = 'Faculty'
      // this.types.splice(4, 2)
    }
    if (this.props.students) {
      this.types = this.types.slice(2, 4)
      this.title = 'Students'
      this.short = true
      // this.types.splice(4, 2)
    }

    let fileNames = Object.keys(summary.fileMap)
    let keys = fileNames.filter((fileName) => {
      return fileName.includes('people')
    })

    this.people = []
    for (let key of keys) {
      let id = key.split('/')[3].replace('.json', '')
      let person = Object.assign(summary.fileMap[key], {id: id})
      this.people.push(person)
    }
    this.people = _.sortBy(this.people, ['order'])

    this.getPhotos()
  }

  getTitle(person) {
    if (person.title) return person
    switch (person.type) {
      case 'postdoc':
        person.title = 'Postdocotral Fellow'
        break
      case 'phd':
        person.title = 'PhD Student'
        break
      case 'master':
        person.title = 'MSc Student'
        break
      case 'undergrad':
        person.title = 'Undergraduate Student'
        break
      case 'visiting':
        person.title = 'Visiting Researcher'
        break
      case 'alumni':
        switch (person.past) {
          case 'postdoc':
            person.title = 'Alumni (PostDoc)'
            break
          case 'phd':
            person.title = 'Alumni (PhD)'
            break
          case 'master':
            person.title = 'Alumni (MSc)'
            break
          case 'undergrad':
            person.title = 'Alumni (Undergrad)'
            break
          case 'visiting':
            person.title = 'Alumni (Visiting)'
            break
        }
        break
    }
    return person
  }

  getPhotos() {
    const pictures =
      files.children
        .filter(dir => dir.name === 'images')[0].children
        .filter(dir => dir.name === 'people')[0].children

    this.pictures = []
    for (let picture of pictures) {
      this.pictures.push(picture.name)
    }
  }

  getPhoto(person) {
    let img = `${person.id}.jpg`
    if (this.pictures.includes(img)) {
      return `/static/images/people/${person.id}.jpg`
    } else {
      return '/static/images/people/no-profile.jpg'
    }
  }

  render() {
    return (
      <div id="people" className="category">
        <h1 className="ui horizontal divider header">
          <i className="child icon"></i>
          {this.title}
        </h1>
        {this.types.map((type) => {
          return (
            <div className="people-category" key={type.title}>
              <h2>{['faculty', 'postdoc'].includes(type.key) ? '' : type.title}</h2>
              <div className="ui grid">
                {this.people
                  .filter((person) => {
                    return person.type === type.key
                  }) // filter
                  .map((person) => {
                    person = this.getTitle(person)
                    let colNum = type.key === 'faculty' ? 'five' : 'four'
                    return (
                      <a className={`${colNum} wide column person`} href={`/people/${person.id}`}
                         key={person.id}>
                        <img className="ui circular image medium-profile"
                           src={this.getPhoto(person)}/>
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
        {this.short &&
          <div className="ui vertical segment stackable" style={{textAlign: 'center'}}>
            <a className="ui button" href="/people">
              + see more members
            </a>
          </div>
        }
      </div>
    )
  }
}

export default People
