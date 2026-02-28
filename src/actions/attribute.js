import axios from 'axios';

export const createAttribute = async (attribute, token) =>
    await axios.post(`${process.env.REACT_APP_API}/admin/add-attribute`, attribute, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

export const allAttributes = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/admin/attributes`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

export const deleteAttribute = async (slug, token) =>
    await axios.delete(`${process.env.REACT_APP_API}/admin/attribute/${slug}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

export const editAttribute = async (slug, attribute, token) =>
    await axios.put(
        `${process.env.REACT_APP_API}/admin/attribute/${slug}`,
        attribute,
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
