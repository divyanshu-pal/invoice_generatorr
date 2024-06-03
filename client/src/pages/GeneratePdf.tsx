import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../app/store';

const GeneratePDF: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.product);
  
  console.log(userInfo)
  const handleGeneratePDF = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/generate', 
      // const response = await axios.post('https://invoice-api-31x7.onrender.com/api/auth/generate',
     
      
        { products },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="container mx-auto flex flex-row justify-center items-center mt-40 gap-5">
      <h2 className='font-bold'>Generate PDF</h2>
      <button onClick={handleGeneratePDF} className='rounded-lg hover:bg-green-400 p-3 cursor-pointer text-white bg-black'>Generate PDF</button>
    </div>
  );
};

export default GeneratePDF;
