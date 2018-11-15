import React, { Component } from 'react'
import api from './Api'
import { Link } from 'react-router-dom'

const statuses = {
    'watched': 'Assistindo',
    'watching': 'Assistido',
    'toWatch': 'À Assistir'
}
class Series extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            series: []
        }
        this.renderSeries = this.renderSeries.bind(this)
        this.loadData = this.laodData.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    laodData() {
        this.setState({ isLoading: true })
        api.loadSeriesByGenre(this.props.match.params.genre).then((res) => {
            this.setState({
                isLoading: false,
                series: res.data
            })
        })
    }
    deleteSeries(id) {
        api.deleteSeries(id).then((res) => this.loadData())
    }
    renderSeries(series) {
        return (
            <div key={series.id} className="item  col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {series.name} <br /> {statuses[series.status]} </h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">
                                    {series.genre}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Link className="btn btn-success" to={'/series-edit/'+series.id}>Editar</Link>
                                <a className="btn btn-success" onClick={() => this.deleteSeries(series.id)}>Excluir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <section id="intro" className="intro-section">
                <h1>Series {this.props.match.params.genre}</h1>
                {
                    this.state.isLoading &&
                    <p>Aguarde, carregando página...</p>
                }
                {
                    !this.state.isLoading && this.state.series.length === 0 &&
                    <div className="alert alert-info">Nehuma série cadastrada.</div>
                }
                <div id="series" className="row list-group">
                    {!this.state.isLoading && this.state.series.map(this.renderSeries)}
                </div>
            </section>
        )
    }
}
export default Series