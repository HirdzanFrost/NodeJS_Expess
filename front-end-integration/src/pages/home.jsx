import React, { Component } from 'react'
import {
      Table,
      Button,
      Form
} from 'react-bootstrap'

import Axios from 'axios'

import NavigationBar from '../components/NavigationBar';

const URL_API = 'http://localhost:2000/product'


class HomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      idEdit: null

    }
  }

  fetchData = () => {
    Axios.get(`${URL_API}/getAllProducts`)
    .then(res => {
      console.log(res.data)
      this.setState({ products: res.data })
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount(){
    this.fetchData()
  }

  renderThead = () => {
      return(
        <thead>
            <tr>
              <th>#</th>
              <th>Prdouct Name</th>
              <th>Product Price</th>
              <th>Action</th>
            </tr>
          </thead>
      )
  }

  renderTbody = () => {
    return(
      <tbody>
        {this.state.products.map((item, index)=> {
          if(this.state.idEdit === item.id){
            return(
          <tr key={index}>
              <td> #</td>
              <td>   <Form.Control ref="nameEdit" defaultValue={item.name}type="text" placeholder="Enter Product Name :" /></td>
              <td>   <Form.Control ref="priceEdit" defaultValue={item.price} type="number" placeholder="Enter Product Price" /></td>
              <td>
                <Button  variant="outline-success" onClick={() => this.onSave(item.id)}>Save</Button>
                <Button  variant="outline-danger" onClick={() => this.setState({ idEdit: null })} >Cancel</Button>
              </td>
          </tr>
            )
          }
        return(
          <tr key={index}>
            <td> {item.id} </td>
            <td> {item.name}</td>
            <td> {item.price}</td>
            <td> 
                <Button title="Edit" variant="outline-warning" onClick={() => this.setState({idEdit: item.id})} >Edit</Button>
                <Button title="Delete" variant="outline-danger" onClick={() => this.onDelete(item.id)} >Delete</Button>
            </td>
          </tr>
        )
        })}
    </tbody>
    )
  }

  onAdd =()=>{
    const name = this.refs.name.value
    const price = +this.refs.price.value

    const data = {
      name,
      price
    }

    Axios.post(`${URL_API}/add-product`,data)
    .then(res => {
      this.setState({ products: res.data})
      this.refs.name.value=""
      this.refs.price.value=""
    })
    .catch(err => {
      console.log(err)
    })
  }

  onDelete = (id) => {
    console.log(id)
    Axios.delete(`${URL_API}/delete-product/${id}`)
    .then(res => {
      this.setState({ products: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  onSave = (id) => {
    const nameEdit = this.refs.nameEdit.value
    const priceEdit = +this.refs.priceEdit.value

    const data = {
      name: nameEdit,
      price: priceEdit
    }
    console.log(data)

    Axios.patch(`${URL_API}/patch-products/${id}`, data)
    .then(res => {
      this.setState({ products: res.data, idEdit: null})
    })
    .catch(err => {
      console.log(err)
    })
  }

  renderTInput =() => {
    return(
      <tfoot>
        <tr>
          <td> #</td>
          <td>   <Form.Control ref="name" type="text" placeholder="Enter Product Name" /></td>
          <td>   <Form.Control ref="price" type="number" placeholder="Enter Product Price" /></td>
          <td>   <Button  variant="outline-success" onClick={this.onAdd}>Add</Button></td>

        </tr>
      </tfoot>
    )
  }

  

  render(){
    return(
      <div>
        <NavigationBar />,
        <Table striped bordered hover variant="dark">
          
            {this.renderThead()}
            {this.renderTbody()}
            {this.renderTInput()}

        </Table>
      </div>
    )
  }
}

export default HomePage