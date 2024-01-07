"use client"
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link'

const HeaderPage = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Shoping-NNH</Navbar.Brand>
                    <Navbar.Toggle />
                    <Nav className="nav-header-body me-auto gap-2">
                        <Link href="/" className='text-light py-2 text-decoration-none'>Home</Link>
                        <Link href="/product" className='text-light py-2 text-decoration-none'>Product</Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link href='/cart' className='btn btn-primary'>Cart: 2</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default HeaderPage