import React, {  useState } from 'react'
import carData from "../assests/Data.json"
import { useSearchParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
function Home() {
    const[find,setFind]=useState("")
    const [itemOffset, setItemOffset] = useState(0);
    const[search,setsearch]=useSearchParams()
    
    //Pagination
    const itemsPerPage=6;
    const endOffset = itemOffset + itemsPerPage;      
    const pageCount = Math.ceil(carData.length / itemsPerPage);
   
        // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % carData.length;
     setsearch({page:event.selected+1})
      setItemOffset(newOffset);
      goToTop();
    };

    //on changing page scroll to top
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
  

  return (
    <div className='bg-[#DEE7F1] w-full min-h-screen '>

    <div className='p-4 px-8 m-5 rounded-lg shadow-md'>
    <form className='flex'>  
    <input className='p-2 w-96 rounded-md' placeholder='Search Cars' onChange={(e)=>{setFind(e.target.value.toLowerCase())}} type="text" />
    <p className='relative right-8 top-1 text-xl text-slate-700'>  <i class="ri-search-line"></i></p>
   
    </form>
      
    </div>
    <div className='w-full flex justify-center p-4'>
    <div className='grid grid-cols-3 grid-rows-2 gap-16 '>
        {
            carData.filter((item)=>{
                return find === "" ? item : item.Name.toLowerCase().includes(find);
            }).slice(itemOffset,endOffset).map((item)=>(
                <div className='shadow-md flex flex-col w-96 rounded-lg' key={item.id}>
                   
                <img className='rounded-t-lg w-96 h-64 object-cover' src={item.images} alt="error"/>
                    <div className='p-2 px-4 flex flex-col gap-2'>
                    <div className='flex justify-between'>
                    <p className='text-lg font-semibold'>{item.Name.toUpperCase()}</p>
                    <p>{item.Year}</p>
                    </div>
                    <div className='grid grid-cols-2 grid-rows-2'>
                    <p  className='text-blue-600 flex gap-1'><i  class="ri-battery-2-charge-line"></i> {item.Cylinders} <p className='text-slate-800'>Cylinders</p></p>
                    <p className='text-blue-600 flex gap-1'><i  class="ri-pin-distance-line"></i> {item.Miles_per_Gallon} <p className='text-slate-800'>m/gl</p></p>
                    <p className='text-blue-600 flex gap-1'> <i  class="ri-fire-fill"></i> {item.Horsepower}<p className='text-slate-800'>HorsePower</p> </p>
                    <p className='text-blue-600 flex gap-1'><i  class="ri-speed-up-line"></i> {item.Acceleration} <p className='text-slate-800'>Accelration</p></p>
                    </div>
                    <div className='flex items-center justify-between '>
                        <p className='text-xl font-semibold'>$520/month</p>
                        <div className='flex items-center gap-5'>
                           <p className='p-1 px-3 text-blue-600 cursor-pointer text-lg rounded-lg bg-[#c3e1fe]'><i class="ri-heart-line"></i></p>
                            <button className='p-2 px-4 bg-blue-400 rounded-xl text-white'>Rent now</button>
                        </div>
                        </div>

                    </div>
                    
                </div>
            )

            )
        }
    </div>
    </div>
    
    <div className=' p-4 shadow-md m-5 rounded-xl'>
    <>
    
      <ReactPaginate
        breakLabel="..."
        nextLabel="->"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<-"
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
    </>
    </div>
    </div>
  )
}

export default Home