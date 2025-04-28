import React from 'react'

const ViewGoods = () => {
    const [goods, setGoods] = useState([]);
  const [error, setError] = useState(null);

  // Fetch goods data from API on component mount
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/goods');
        setGoods(response.data);
      } catch (error) {
        console.error('Error fetching goods:', error);
        setError('Error fetching goods.');
      }
    };

    fetchGoods();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  return (
    <div className='container w-full h-[100vh] flex flex-col p-0'>
  <div className='w-full p-6 bg-slate-400'>
    <h1 className='text-center text-3xl font-bold font-serif'>All Goods Available</h1>
  </div>
  {goods.length > 0 ? (
    <div className=''>{}</div>
  ) : (
    <div>No goods available</div> // Display message when there are no goods
  )}
</div>
  )
}

export default ViewGoods
