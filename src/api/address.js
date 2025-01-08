import request from '@/utils/request'

// 1.获取地址列表
export const getAddress = () => {
  return request.get('/address/list')
}

// 2.获取默认地址id
export const getDefaultAddress = () => {
  return request.get('/address/defaultId')
}

// 3.设置默认地址id
export const setDefaultAddress = (addressId) => {
  return request.post('/address/setDefault', {
    addressId
  })
}

// 4.添加新的地址
export const addAddress = (data) => {
  return request.post('/address/add', {
    form: {
      name: data.name,
      phone: data.tel,
      region: [
        {
          value: 782,
          label: data.province
        },
        {
          value: 783,
          label: data.city
        },
        {
          value: 785,
          label: data.county
        }
      ],
      detail: data.addressDetail
    }
  })
}

// 5.删除地址
export const deleteAddress = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}

// 6.获取详细地址
export const getAddressDetail = (addressId) => {
  return request.get('/address/detail', {
    params: {
      addressId
    }
  })
}
