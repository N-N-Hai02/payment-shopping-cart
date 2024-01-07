import Link from 'next/link';
import Table from 'react-bootstrap/Table';

const Cart = () => {
    return (
        <>
            <Table bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Total</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>image</td>
                        <td>Product 1</td>
                        <td>3</td>
                        <td>120.00.00 đ</td>
                        <td><Link href='' className='btn btn-outline-danger'>Xóa</Link></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={4}>Thành Tiền: 120.00.00 đ</td>
                        <td className='w-25'>
                            <Link href='' className='btn btn-warning mx-2'>Thanh Toán khi nhận hàng</Link>
                            <Link href='' className='btn btn-danger'>Momo</Link>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Cart