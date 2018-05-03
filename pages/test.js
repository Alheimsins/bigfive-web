import { Component } from 'react'
import Router from 'next/router'
import { Button, ProgressBar, RadioGroup, Radio, Timer } from '../components/alheimsins'
import getConfig from 'next/config'
import axios from 'axios'
const { publicRuntimeConfig } = getConfig()
const httpInstance = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 1000
})
const { getItems: getInventory, getInfo } = require('b5-johnson-120-ipip-neo-pi-r')
const getItems = require('../lib/get-items')
const sleep = require('../lib/sleep')

export default class extends Component {
  constructor (props) {
    super(props)
    const lang = props && props.query && props.query.lang && props.query.lang.length === 2 ? props.query.lang : 'en'
    const inventory = getInventory(lang)
    this.state = {
      progress: 0,
      position: 0,
      inventory: inventory,
      itemsPerPage: 4,
      results: [],
      answers: [],
      items: [],
      now: Date.now(),
      lang: lang
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  componentDidMount () {
    const itemsPerPage = window.innerWidth < 600 ? 1 : 4
    const { items } = getItems(this.state.position, itemsPerPage, this.state.inventory).current()
    this.setState({ items, itemsPerPage })
  }

  async handleChange (e) {
    let {answers, items, inventory, itemsPerPage} = this.state
    const { domain, facet } = inventory.find(q => q.id === e.target.name)
    answers[e.target.name] = { score: parseInt(e.target.value), domain, facet }
    const next = itemsPerPage === 1 ? false : items.filter(item => !answers[item.id]).length === 0
    const progress = Math.round(Object.keys(answers).length / inventory.length * 100)
    this.setState({ answers, progress, next })
    if (itemsPerPage === 1) {
      await sleep(700)
      this.handleSubmit()
    }
  }

  handleBack () {
    window.scrollTo(0, 0)
    const { previous, items, position } = getItems(this.state.position, this.state.itemsPerPage, this.state.inventory).back()
    this.setState({ items, position, next: true, previous })
  }

  async handleSubmit () {
    window.scrollTo(0, 0)
    const { items, finished, position } = getItems(this.state.position, this.state.itemsPerPage, this.state.inventory).next()
    if (finished) {
      const answers = this.state.answers
      const choices = Object.keys(answers).reduce((prev, current) => {
        const choice = answers[current]
        prev.push({
          domain: choice.domain,
          facet: choice.facet,
          score: choice.score
        })
        return prev
      }, [])
      const result = {
        ...getInfo(),
        lang: this.state.lang,
        answers: choices
      }
      try {
        const { data } = await httpInstance.post('/api/save', result)
        Router.push(`/result/${data._id}`)
      } catch (error) {
        throw error
      }
    } else {
      const next = items.filter(item => !this.state.answers[item.id]).length === 0
      this.setState({ items, position, next, previous: true })
    }
  }

  render () {
    const { items, progress, answers, next, previous } = this.state
    const { handleChange, handleSubmit, handleBack } = this
    return (
      <div style={{textAlign: 'left'}}>
        <div style={{textAlign: 'right', fontSize: '12px'}}>
          <Timer start={this.state.now} />
        </div>
        <ProgressBar progress={progress} />
        { items.map(item =>
          <div key={item.id} className='item'>
            <div className='question'>
              { item.text }
            </div>
            <RadioGroup name={item.id} onChange={handleChange} checked={answers[item.id] && answers[item.id].score}>
              { item.choices.map(choice =>
                <Radio key={item.id + choice.score} value={choice.score} color={choice.color} text={choice.text} style={{display: 'block'}} />
              )}
            </RadioGroup>
          </div>
        )}
        <div className='navigation'>
          <div style={{marginRight: '10px'}}>
            <Button type='submit' value='Back' onClick={handleBack} disabled={!previous} />
          </div>
          <div>
            <Button type='submit' value='next' onClick={handleSubmit} disabled={!next} />
          </div>
        </div>
        <style jsx>
          {`
            .item {
              margin-top: 30px;
            }
            .navigation {
              margin-top: 30px;
              display: inline-flex;
            }
            .question {
              font-size: 28px;
              margin-bottom: 2px;
            }
          `}
        </style>
      </div>
    )
  }
}
