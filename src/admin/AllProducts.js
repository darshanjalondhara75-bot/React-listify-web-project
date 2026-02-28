import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';
import moment from 'moment';
import { Card, Avatar, Empty, Pagination, message } from 'antd';
import { activeProducts } from '../actions/admin';
import { productStatus, updateproductStatus } from '../actions/admin';
import { useState, useEffect } from 'react';
import StatusToggle from '../components/StatusToggle';

const { Meta } = Card;

const mockProducts = [
  {
    _id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'Brand new iPhone 15 Pro Max, 256GB, Titanium Black. Unopened box with all accessories.',
    price: 1200000,
    images: ['https://listify.codderlab.com/uploads/adListing/1760674670807-4206.avif'],
    status: 'active',
    category: { _id: 'cat1', name: 'Mobile Phones' },
    location: { _id: 'loc1', name: 'Lagos, Nigeria' },
    condition: 'New',
    author: { _id: 'auth1', name: 'David John' },
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Samsung Galaxy S24 Ultra, 512GB, Titanium Gray. Slightly used, like new condition.',
    price: 1100000,
    images: ['https://listify.codderlab.com/uploads/adListing/1760674670807-4206.avif'],
    status: 'active',
    category: { _id: 'cat1', name: 'Mobile Phones' },
    location: { _id: 'loc2', name: 'Abuja, Nigeria' },
    condition: 'Used',
    author: { _id: 'auth2', name: 'Liam Thompson' },
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'MacBook Pro 16", M3 Max',
    description: 'Powerful MacBook Pro for professionals. M3 Max chip, 64GB RAM, 1TB SSD.',
    price: 3500000,
    images: ['https://listify.codderlab.com/uploads/adListing/1760674670807-4206.avif'],
    status: 'active',
    category: { _id: 'cat2', name: 'Laptops' },
    location: { _id: 'loc1', name: 'Lagos, Nigeria' },
    condition: 'New',
    author: { _id: 'auth1', name: 'David John' },
    createdAt: new Date().toISOString()
  }
];

const AllProducts = () => {
  const countPerPage = 5;
  const [products, setProducts] = useState([]);
  const [enums, setEnums] = useState({
    status: [],
    newStatus: '',
  });
  const [current, setCurrent] = useState();
  const [pagination, setPagination] = useState();
  const { status, newStatus } = enums;
  const { user, token } = isAuthenticated();

  const loadProducts = async (page) => {
    try {
      const res = await activeProducts();
      setCurrent(page);
      const to = page * countPerPage;
      const from = to - countPerPage;
      const allData = res.data && res.data.length > 0 ? res.data : mockProducts;
      setPagination(allData.slice(from, to));
      setProducts(allData);
    } catch (err) {
      console.log('API failed, using mock data');
      setCurrent(page);
      const to = page * countPerPage;
      const from = to - countPerPage;
      setPagination(mockProducts.slice(from, to));
      setProducts(mockProducts);
    }
  };
  const loadProductStatus = async () => {
    const res = await productStatus();
    setEnums({ status: res.data });
  };

  useEffect(() => {
    loadProducts(1);
    loadProductStatus();
  }, [newStatus]);

  // check for Pending products if none display Empty
  let checkActive = products.some(function (product) {
    return product.status === 'active';
  });

  // get Pending product count
  const totalCount = products.filter((product) => product.status === 'active');

  const handleStatusChange = async (e, productId) => {
    const status = e.target.value;
    try {
      const res = await updateproductStatus({ productId, status, token });
      console.log(res);
      message.success('Status updated', 4);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) message.error(err.response.data, 4);
    }
    setEnums({ ...enums, newStatus: status });
  };

  //format currency
  Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem('buynsell');
    history.push('/login');
    window.location.reload();
  };

  return (
    <>
      <div className='row container-fluid mx-auto mt-5 profile-container'>
        <div className='col-md-3 mb-5'>
          <Card
            className='card-shadow'
            style={{ width: 'auto' }}
            cover={
              <Avatar
                src={user.photo}
                className='mx-auto mt-3 avatar-user'
                size={130}
              >
                {user.name[0]}
              </Avatar>
            }
          >
            <div className='text-center'>
              <h5>({user.username})</h5>
            </div>
            <Meta
              title={user.name}
              description={user.phone}
              className='text-center user-details'
            />
          </Card>
          <ul className='list-group rounded-0 profile-list card-shadow'>
            {user.role === 'admin' && (
              <li className='list-group-item'>
                <Link
                  to='/user/dashboard'
                  className='text-dark1 text-decoration-none'
                >
                  <i class='fas fa-user'></i> User Dashboard
                </Link>
              </li>
            )}
            <li className='list-group-item'>
              <Link
                to='/admin/dashboard'
                className='text-dark1 text-dark-hover text-decoration-none'
              >
                <i class='fas fa-user-shield'></i> Admin Dashboard
              </Link>
            </li>
            <li className='list-group-item'>
              <Link
                to='/admin/add-category'
                className='text-dark1 text-decoration-none'
              >
                <i class='fas fa-plus-square'></i> Add Category
              </Link>
            </li>
            <li className='list-group-item'>
              <Link
                to='/admin/add-location'
                className='text-dark1 text-decoration-none'
              >
                <i class='fas fa-plus-circle'></i> Add Location
              </Link>
            </li>
            <li className='list-group-item'>
              <Link
                to='/admin/users'
                className='text-dark1 text-decoration-none'
              >
                <i class='fas fa-user-edit'></i> Manage Users
              </Link>
            </li>
            <li
              className='list-group-item text-dark1'
              role='button'
              onClick={logout}
            >
              <i class='fas fa-sign-out-alt'></i> Logout
            </li>
          </ul>
        </div>
        <div className='col-md-9 mb-5'>
          <div className='card rounded-0 profile-card card-shadow'>
            <div className='card-header profile-card p-3'>
              <h4>Manage Products ({totalCount.length})</h4>
            </div>
            {!checkActive && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {checkActive && (
              <div className='card-body'>
                {pagination.map((p, i) => {
                  if (p.status === 'active') {
                    return (
                      <div
                        class='card rounded-0 mb-3 product-card'
                        key={i}
                        style={{
                          opacity: p.status === 'active' ? 1 : 0.6,
                          filter: p.status === 'active' ? 'none' : 'grayscale(0.5)',
                          transition: 'opacity 0.3s ease, filter 0.3s ease',
                          backgroundColor: p.status === 'active' ? 'inherit' : '#fcfcfc'
                        }}
                      >
                        <div class='row g-0'>
                          <div class='col-md-3 product-img'>
                            <Link
                              to={`/product/${p._id}`}
                              className='text-decoration-none'
                            >
                              <img
                                src={p.images[0]}
                                className='img-fluid rounded-start img-horizontal'
                                alt={p.name}
                                style={{ height: '100%' }}
                              />
                              <span className='product-img-count'>
                                <span className='badge badge-pill opacity'>
                                  {p.images.length}
                                  <i class='fas fa-images ps-1'></i>
                                </span>
                              </span>
                            </Link>
                          </div>
                          <div class='col-md-9'>
                            <div class='card-body pt-3 pb-2'>
                              <div className='d-flex justify-content-between'>
                                <Link
                                  to={`/product/${p._id}`}
                                  className='text-decoration-none'
                                >
                                  <h6 class='card-title text-dark1'>
                                    {p.name}
                                  </h6>
                                </Link>
                                <span>
                                  <h6 className='text-success'>
                                    ₦{parseInt(p.price).format()}
                                  </h6>
                                </span>
                              </div>
                              <small>
                                <p class='card-text text-muted'>
                                  {p.description.substring(0, 85)}..
                                </p>
                              </small>
                              <div className='d-flex justify-content-between align-items-center mt-4 product-cat-text'>
                                <div>
                                  <span>
                                    <Link
                                      to={`/category/${p.category._id}`}
                                      className='badge badge-pill text-muted me-2 text-decoration-none'
                                      style={{
                                        backgroundColor: '#eef2f4',
                                        color: '#303a4b',
                                        // fontSize: '14px',
                                      }}
                                    >
                                      {p.category.name}
                                    </Link>
                                  </span>
                                  <span>
                                    <div
                                      className='badge badge-pill text-muted'
                                      style={{
                                        backgroundColor: '#eef2f4',
                                        color: '#303a4b',
                                      }}
                                    >
                                      {p.condition}
                                    </div>
                                  </span>
                                </div>
                                <div className='d-flex align-items-center'>
                                  <span className='ms-2'>
                                    <StatusToggle
                                      currentStatus={p.status === 'active'}
                                      onToggle={async (newStatus) => {
                                        await handleStatusChange({ target: { value: newStatus === 'live' ? 'active' : 'inactive' } }, p._id);
                                      }}
                                      activeStatus="live"
                                      inactiveStatus="danger"
                                    />
                                  </span>
                                  <span className='ps-2'>
                                    <Link
                                      to={`/edit-product/${p._id}`}
                                      class='btn btn-primary btn-sm text-white pt-0 pb-0'
                                    >
                                      Edit
                                    </Link>
                                  </span>
                                </div>
                              </div>
                              <span class='card-text d-flex justify-content-between'>
                                <Link
                                  to={`/search-result?&location=${p.location._id}&category=&name=&price=&condition=`}
                                  className='text-decoration-none'
                                >
                                  <p
                                    className='text-muted'
                                    style={{ fontSize: '14px' }}
                                  >
                                    <i class='fas fa-map-marker-alt me-2'></i>
                                    {p.location.name}
                                  </p>
                                </Link>
                                <small class='text-muted'>
                                  {moment(p.createdAt).fromNow()} by{' '}
                                  <Link
                                    to={`/user/${p.author._id}`}
                                    className='text-decoration-none text-dark1'
                                  >
                                    {p.author.name}
                                  </Link>
                                </small>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                <Pagination
                  pageSize={countPerPage}
                  onChange={loadProducts}
                  defaultCurrent={current}
                  total={products.length}
                />
              </div>
            )}
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default AllProducts;

