import React, { useState } from 'react';
import  { Navbar,Container, NavbarBrand, Nav, NavLink, NavDropdown, Form, FormGroup, FormControl, Card,CardImg,CardBody, Button, CardFooter } from 'react-bootstrap';
import Data from '../Data';


function Bakery(){
    const[search,setSearch]=useState('');
    const[cart,setCart]=useState([])
    
    const addToCart = (item)=>{
        setCart((prevCart)=>[...prevCart,item])
        console.log(item)
    }

    const removeItem = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('Rs', '').trim());  // Also trim to remove any extra spaces
            return total + price;
        }, 0).toFixed(2);
    };
    
    


    return(<div>
    
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <NavbarBrand><h4><NavLink href='/'>Bakery</NavLink></h4></NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id='basic-navbar-nav'>

            <Nav> 
                <NavLink className='text-success p-2 ' ><h6>Home</h6></NavLink>
                <NavLink className='ps-2 text-dark' href=''><h6>Menu</h6></NavLink>
                <NavLink className='ps-2 text-dark' href='/#'><h6>Mocktails</h6></NavLink>
                
                <NavLink className='ps-2 text-dark' href='/#'><h6>Desserts</h6></NavLink>

                
            </Nav>
            <NavDropdown className='ps-2 text-dark'  title="Specials" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"><h6>Italian Delight</h6></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                <h6>Chinese</h6>
              </NavDropdown.Item>            

                </NavDropdown>

            </Navbar.Collapse>
        </Container>
     


        </Navbar>

        <div className='d-flex justify-content-around'>
        <Form className=' '>
            <FormGroup>
                <FormControl className=' mt-3 ' onChange={(e) => setSearch(e.target.value)} placeholder='search here'></FormControl>
            </FormGroup>
        </Form>
        <img src="basket.jpg" width={'60px'} alt="Description of image" /> 
        

        </div>
        <div className="row  m-auto p-2">
        {Data.filter((item) => {
          return search.toLowerCase() === '' ? item : item.Item.toLowerCase().includes(search);
        }).map((items, index)=>(
            <div className="col-12  col-md-4 mb-4" key={index}>
            <Card className="w-75 text-center m-auto">
              <CardImg src={items.image}></CardImg>
              <CardBody><h5>{items.Item}</h5></CardBody>
              <div className=' ms-2 me-2'>
              <p className=' m-auto'>Creamy cheese with a crunchy biscuit base</p>
              <CardFooter className='text-center'>
              <div className='d-flex justify-content-between'>
              <h6>Rs.{items.price}</h6>
              <Button onClick={()=> {
                alert('Item is added')
                addToCart(items)
              }} variant='dark' className=' '>Add</Button>
              <Button  variant="danger" className="ms-2" onClick={() => removeItem(index)}> Del
              </Button>
              </div>
              
              </CardFooter>
              </div>                        
            </Card>
          </div>
        )
        )}        
      </div>

      <div className="cart-section m-auto mt-5">
        <h2>Selected Items</h2>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>No items added to the cart yet.</p>
            
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item d-flex ">
                <span><h6>{item.Item}</h6></span>
                <span><h6>-{item.price}</h6></span>
              </div>
            ))
          )}
          <div className="cart-total">
          <h4>Total Price: Rs{calculateTotal()}</h4>
        </div>
        </div>
      </div>


    </div>

    </div>)

}

export default Bakery