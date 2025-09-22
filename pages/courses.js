import React from 'react'
import ReactMarkdown from 'react-markdown'

/* https://docs.fontawesome.com/web/use-with/react/add-icons#add-whole-styles */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas)

class Courses extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div id="courses" className="category">
        <h1 className="ui horizontal divider header">
          <FontAwesomeIcon icon="fas fa-building-columns" />
          Courses
        </h1>
        <div className="ui divided items">
          <h1>HCI Related Courses</h1>

          <p>There are several courses related to HCI and InfoVis.</p>
          <table className="ui celled table">
            <thead>
              <tr><th>Course</th>
              <th>Title</th>
            </tr></thead>
            <tbody>
              <tr>
                <td>CPSC 481</td>
                <td>Human-Computer Interaction I</td>
              </tr>
              <tr>
                <td>CPSC 581</td>
                <td>Human-Computer Interaction II</td>
              </tr>
              <tr>
                <td>CPSC 502</td>
                <td>Research Project in Human Computer Interaction</td>
              </tr>
              <tr>
                <td>CPSC 503</td>
                <td>Research Project in Human Computer Interaction</td>
              </tr>
              <tr>
                <td>CPSC 583</td>
                <td>Introduction to Information Visualization</td>
              </tr>
              <tr>
                <td>CPSC 584</td>
                <td>Human-Robot Interaction</td>
              </tr>
              <tr>
                <td>CPSC 599</td>
                <td>Special Topics in Computer Science (Physical & Tangible HCI)</td>
              </tr>

              <tr>
                <td>CPSC 599</td>
                <td>Special Topics in Computer Science (Wearables & Haptics)</td>
              </tr>

              <tr>
                <td>CPSC 599</td>
                <td>Special Topics in Computer Science (Design of Mixed Reality App)</td>
              </tr>
              <tr>
                <td>CPSC 601</td>
                <td>Special Topics in Computer Science (Epidermal Computing)</td>
              </tr>
              <tr>
                <td>DATA 601</td>
                <td>Working with Data and Visualization</td>
              </tr>
              <tr>
                <td>DATA 605</td>
                <td>Actionable Visualization and Analytics</td>
              </tr>
            </tbody>
          </table>
          <p>Please see the course list for more details.</p>
          <a href="http://contacts.ucalgary.ca/info/cpsc/courses">
            <FontAwesomeIcon icon="fas fa-link fa-fw" />
            http://contacts.ucalgary.ca/info/cpsc/courses
          </a>


        </div>
      </div>
    )
  }
}

export default Courses
