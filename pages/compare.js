import { Component } from 'react'
import getConfig from 'next/config'
import { Router } from '../routes'
import { Code, Field, Button, InputText } from '../components/alheimsins'
import { MdDelete } from 'react-icons/lib/md'
import base64url from '../lib/base64url'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
const { publicRuntimeConfig: { URL } } = getConfig()

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      people: []
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCompare = this.handleCompare.bind(this)
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleDelete (num) {
    const people = this.state.people
    people.splice(num, 1)
    this.setState({ people: [ ...people ] })
  }

  handleAdd (e) {
    e.preventDefault()
    const name = this.state.name
    const id = formatId(this.state.id)
    this.setState({ name: '', id: '', people: [ ...this.state.people, { name, id } ] })
  }

  handleCompare () {
    const people = JSON.stringify(this.state.people)
    const id = base64url.encode(people)
    Router.pushRoute('showCompare', { id })
  }

  render () {
    const { name, people, id } = this.state
    const formattedId = formatId(id)
    return (
      <div>
        <h2>Compare</h2>
        <p>Compare results from the bigfive personality test with multiple people.</p>
        <p>Type in <i>either</i> the ID you got i.e. <Code>58a70606a835c400c8b38e84</Code> <br /><i>- or -</i><br /> the link i.e. <Code>{URL}/result/58a70606a835c400c8b38e84</Code><br /> in the <i>ID-input field</i>.</p>
        <div style={{ textAlign: 'left' }}>
          { people && people.length > 0 && people.map((person, i) =>
            <div key={i} className='persons'>
              <a title='Delete' onClick={() => this.handleDelete(i)}>
                <MdDelete style={{ cursor: 'pointer', marginRight: '10px' }} />
              </a>
              <b>{person.name}</b> - <i>{person.id}</i>
            </div>
          )}
          { people && people.length >= 2 && <Button value='Compare people' onClick={this.handleCompare} /> }
          <form onSubmit={this.handleAdd} style={{ marginTop: '40px' }}>
            <Field name='Name'>
              <InputText name='name' value={name} onChange={this.handleChange} placeholder='Name for comparison' autoComplete='off' autoFocus />
            </Field>
            <Field name='ID'>
              <InputText name='id' value={id} onChange={this.handleChange} placeholder='URL or id for comparison' autoComplete='off' />
            </Field>
            <Button value='Add' type='submit' disabled={!validMongoId(formattedId) || !id || !name} />
          </form>
          <style jsx>
            {`
              .persons {
                padding: 8px;
                font-size: 14px;
              }
              .persons a {
                font-size: 18px;
              }
              .persons:nth-of-type(even) {
                background: rgb(234, 234, 234);
              }
            `}
          </style>
        </div>
      </div>
    )
  }
}
