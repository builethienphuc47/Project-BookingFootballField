import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Loader from "../../components/loader";
import axios from "axios";
import { API_EDIT_ORDER, API_GET_ORDERS_MANAGEMENT } from "../../assets/urls/endpoint";
import iconTrash from "../../assets/images/trash-bin.png";
import iconYes from "../../assets/images/yesicon.png";
import iconNo from "../../assets/images/no.png";
import { toast } from 'react-toastify'


const OrdersManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState();


  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(API_GET_ORDERS_MANAGEMENT)
      .then(function (response) {
        // handle success
        const data = response.data.orders;
        console.log("Management: ", data);
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log(error);
      });
  };

  
  const handleClearData = () => {
    setOrderStatus('')
  }

  const handleAgree = (id) => {
    const url = API_EDIT_ORDER + id
    axios
    .patch(url, {
      orderStatus
    })
    .then(function (respone) { 
      handleClearData()
      setOrderStatus('agree')
      fetchAPI()
      toast.success('Duyệt yêu cầu thành công!!!', {
        position: 'top-right',
        autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
      .catch(function (error) {
        toast.erorr('Duyệt cầu thất bại !!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  };


  const handleDisagree = (id) => {
    const url = API_EDIT_ORDER + id
    axios
    .patch(url, {
      orderStatus
    })
    .then(function (respone) {
      handleClearData()
      setOrderStatus('disagree')
      fetchAPI()
        toast.success('Huỷ yêu cầu thành công!!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
      .catch(function (error) {
        toast.erorr('Huỷ yêu cầu thất bại!!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleChecked = (item) => {
    const isOrderStatus = item?.orderStatus;
    if (isOrderStatus === 'waiting') {
      return (
        <div className="flex my-2 ">
          <img
            src={iconYes}
            className="w-6 h-6 hover:scale-110 cursor-pointer mx-2"
            alt={iconYes}
            onClick = {handleAgree(item?._id)}
          />
          <img
            src={iconNo}
            className="w-6 h-6 hover:scale-110 cursor-pointer"
            alt={iconNo}
            onClick = {handleDisagree(item?._id)}
          />
        </div>
      );
    }
    if (isOrderStatus === 'agree'){
      return (
        <p className='text-red-400'>Sân đặt thành công</p>
      )
    }
    if (isOrderStatus === 'disagree'){
      return (
        <p className='text-red-400'>Từ chối đặt sân</p>
      )
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-20 pt-10">
        <p className="text-center my-10 font-bold text-xl uppercase text-cyan-800">
          Quản lý lịch sử đặt sân
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Tên khách hàng
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Số điện thoại
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Ngày đặt
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Giờ đặt
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Tên sân
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr
                    key={item?._id}
                    class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.customerName}
                    </th>
                    <td class="py-4 px-6">{item?.phone}</td>
                    <td class="py-4 px-6">{item?.dateOrder}</td>
                    <td class="py-4 px-6">{item?.timeOrder}</td>
                    <td class="py-4 px-6">{item?.pitchName}</td>
                    <td class="py-4 px-6">{handleChecked(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;
