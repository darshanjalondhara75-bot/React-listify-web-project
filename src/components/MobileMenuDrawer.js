import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileMenuDrawer = ({ categories }) => {
  const [categoryVisible, setCategoryVisible] = useState(false);

  const handleCategory = () => {
    setCategoryVisible(true);
  };

  const handleCategoryClose = () => {
    setCategoryVisible(false);
  };

  return (
    <>
      <Button
        className='rounded-0'
        size='large'
        type='primary'
        onClick={handleCategory}
        style={{
          marginBottom: '16px',
          width: '90%',
          backgroundColor: '#33b27b',
          borderColor: '#33b27b',
        }}
      >
        <i class='fas fa-list-alt me-1'></i> View Categories
      </Button>
      <Drawer
        title='Categories'
        placement={'left'}
        // closable={false}
        onClose={handleCategoryClose}
        visible={categoryVisible}
      >
        {categories.map((c, i) => {
          return (
            <Link
              key={i}
              to={`/category/${c._id}`}
              className='text-decoration-none'
            >
              <li className='list-group-item side-menu rounded-0 list-group-item-action d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-row align-items-center justify-content-between w-100 text-dark1'>
                  <span>{c.name}</span>
                  <p className='mb-0 text-muted ms-2'>
                    <small>({c.productCount})</small>
                  </p>
                </div>
              </li>
            </Link>
          );
        })}
      </Drawer>
    </>
  );
};

export default MobileMenuDrawer;

